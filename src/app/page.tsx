import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">Mock OpenClaw Blog SaaS Demo</h1>
      <p className="text-zinc-700">
        This demo validates one integration pattern: OpenClaw can interact with a spec-compliant API secured by
        Bearer API key and guided via hosted <code>/SKILL.md</code>.
      </p>

      <div className="rounded-lg border p-4">
        <h2 className="mb-2 font-semibold">Quick Links</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <Link className="underline" href="/playground">
              /playground
            </Link>
          </li>
          <li>
            <a className="underline" href="/SKILL.md">
              /SKILL.md
            </a>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-2 font-semibold">API Base</h2>
        <p className="font-mono text-sm">/api/v1</p>
        <p className="mt-2 text-sm text-zinc-700">Use header: Authorization: Bearer sk-demo-openclaw-2026</p>
      </div>
    </main>
  );
}
