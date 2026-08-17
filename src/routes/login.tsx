import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm space-y-5">
        <p className="text-xs tracking-[0.32em] text-muted">SILK SNAKE</p>
        <h1 className="font-display text-3xl font-medium tracking-[0.18em]">登录</h1>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              className="w-full min-h-11 rounded-full border border-border px-4 py-2 text-sm tracking-[0.16em] hover:bg-surface"
            >
              使用 {p.label} 继续
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">登录未开启。</p>
        )}
        <Link to="/" search={{ style: undefined, seed: undefined, name: undefined }} className="block text-center text-sm tracking-[0.16em] text-muted">
          返回
        </Link>
      </div>
    </main>
  );
}
