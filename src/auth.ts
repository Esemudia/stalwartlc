// ─── Auth module ────────────────────────────────────────────────────────────
// Stores the authenticated session in sessionStorage so it survives
// page refreshes within the same browser tab, but clears automatically
// when the tab is closed.

export type UserRole =
    | "client"
    | "lawyer"
    | "front_desk"
    | "exec_secretary"
    | "super_admin";

export interface AuthSession {
    role: UserRole;
    name: string;
    email: string;
    token?: string; // Add JWT token support
}

const SESSION_KEY = "slc_session";

// ── Persistence helpers ──────────────────────────────────────────────────────

export function getSession(): AuthSession | null {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
        return null;
    }
}

export function saveSession(session: AuthSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
}

// ── Role → portal URL mapping ────────────────────────────────────────────────

export const ROLE_PORTAL: Record<UserRole, string> = {
    client: "/portal/client",
    lawyer: "/internal",
    front_desk: "/internal",
    exec_secretary: "/internal",
    super_admin: "/internal",
};

export const PORTAL_ROLES: Record<string, UserRole[]> = {
    "/portal/client": ["client"],
    "/internal": ["lawyer", "front_desk", "exec_secretary", "super_admin"],
};

export function portalForRole(role: UserRole): string {
    return ROLE_PORTAL[role];
}

export function canAccessPortal(pathname: string, role: UserRole): boolean {
    if (pathname.startsWith("/internal")) {
        return PORTAL_ROLES["/internal"].includes(role);
    }
    const allowed = PORTAL_ROLES[pathname];
    return allowed ? allowed.includes(role) : false;
}
