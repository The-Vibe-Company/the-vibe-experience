import { createClient } from "@supabase/supabase-js";

const url = process.env.CONDUCTOR_SUPABASE_URL;
const serviceRoleKey = process.env.CONDUCTOR_SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Les identifiants Admin de la stack Supabase locale sont absents.");
}

const admin = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const password = "vibe-local-123";
const users = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    email: "nouveau@local.test",
    kind: "fresh",
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    email: "demo@local.test",
    kind: "demo",
  },
];

async function seedDemoUser(userId) {
  const { error: profileError } = await admin
    .from("profiles")
    .update({ niveau: "Débutant", objectif: "un site" })
    .eq("id", userId);

  if (profileError) throw profileError;

  const { error: progressError } = await admin.from("module_progress").upsert(
    {
      user_id: userId,
      module_key: "/module",
      done: ["0.0", "0.1", "1.0"],
    },
    { onConflict: "user_id,module_key" },
  );

  if (progressError) throw progressError;

  const { error: metadataError } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: { conductor_seed_state: "complete" },
  });

  if (metadataError) throw metadataError;
}

for (const user of users) {
  const { data: existing, error: lookupError } = await admin.auth.admin.getUserById(user.id);

  if (existing?.user) {
    if (
      user.kind === "demo" &&
      existing.user.user_metadata?.conductor_seed_state === "pending"
    ) {
      await seedDemoUser(user.id);
      console.log(`Seed local repris et termine : ${user.email}`);
      continue;
    }

    console.log(`Compte local conserve : ${user.email}`);
    continue;
  }

  if (lookupError && lookupError.status !== 404) {
    throw lookupError;
  }

  const { error: createError } = await admin.auth.admin.createUser({
    id: user.id,
    email: user.email,
    password,
    email_confirm: true,
    user_metadata: {
      conductor_seed_state: user.kind === "demo" ? "pending" : "complete",
    },
  });

  if (createError) throw createError;

  if (user.kind === "demo") {
    await seedDemoUser(user.id);
  }

  console.log(`Compte local cree : ${user.email}`);
}
