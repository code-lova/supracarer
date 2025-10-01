/**
 * Utility functions for checking user roles
 */
import { useSession } from "next-auth/react";

/**
 * Hook to get the current user session and role
 * @returns {Object} - Object containing session, role, and status
 */
export const useUserRole = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role ?? null;

  return {
    session,
    role,
    status,
    user: session?.user,
  };
};

/**
 * Check if the current role is a client
 * @param {string} role - User role from session
 * @returns {boolean} - True if user is a client
 */
export const isClient = (role) => {
  return role === "client";
};

/**
 * Check if the current role is an admin
 * @param {string} role - User role from session
 * @returns {boolean} - True if user is an admin
 */
export const isAdmin = (role) => {
  return role === "admin";
};

/**
 * Check if the current role is a health worker
 * @param {string} role - User role from session
 * @returns {boolean} - True if user is a health worker
 */
export const isHealthWorker = (role) => {
  return role === "health-service";
};

/**
 * Get role-specific message for unassigned health worker
 * @param {string} role - User role from session
 * @returns {string} - Role-specific message
 */
export const getUnassignedHealthWorkerMessage = (role) => {
  if (isAdmin(role)) {
    return "You have not yet assigned a health worker to this appointment. Please assign a suitable health worker to proceed.";
  } else if (isClient(role)) {
    return "A health worker has not been assigned to this appointment yet. You will be notified once an admin assigns a suitable health worker.";
  } else {
    return "A health worker has not been assigned to this appointment yet.";
  }
};

/**
 * Render content based on user role
 * @param {string} role - User role from session
 * @param {Object} content - Object with role-specific content
 * @param {React.ReactNode} content.admin - Content for admin users
 * @param {React.ReactNode} content.client - Content for client users
 * @param {React.ReactNode} content.healthWorker - Content for health worker users
 * @param {React.ReactNode} content.default - Default content for unknown roles
 * @returns {React.ReactNode} - Role-specific content
 */
export const renderByRole = (role, content) => {
  if (isAdmin(role) && content.admin) {
    return content.admin;
  } else if (isClient(role) && content.client) {
    return content.client;
  } else if (isHealthWorker(role) && content.healthWorker) {
    return content.healthWorker;
  } else {
    return content.default || null;
  }
};

/**
 * Check if user has permission to perform an action
 * @param {string} role - User role from session
 * @param {string[]} allowedRoles - Array of roles allowed to perform the action
 * @returns {boolean} - True if user has permission
 */
export const hasPermission = (role, allowedRoles) => {
  return allowedRoles.includes(role);
};

/**
 * Get role-specific navigation items or configuration
 * @param {string} role - User role from session
 * @returns {Object} - Role-specific configuration
 */
export const getRoleConfig = (role) => {
  const configs = {
    admin: {
      canEdit: true,
      canDelete: true,
      canAssign: true,
      canViewAll: true,
      dashboardPath: "/admin/dashboard",
    },
    client: {
      canEdit: false,
      canDelete: false,
      canAssign: false,
      canViewAll: false,
      dashboardPath: "/client/dashboard",
    },
    "health-service": {
      canEdit: true,
      canDelete: false,
      canAssign: false,
      canViewAll: false,
      dashboardPath: "/health-service/dashboard",
    },
  };

  return configs[role] || {};
};
