/**
 * Example component showing different ways to use userRoleUtils
 * This is for demonstration purposes - you can adapt these patterns to your needs
 */

import React from "react";
import {
  useUserRole,
  isAdmin,
  isClient,
  isHealthWorker,
  renderByRole,
  hasPermission,
  getRoleConfig,
} from "@utils/userRoleUtils";
import { FaEdit, FaTrash, FaUserPlus, FaEye } from "react-icons/fa";

const ExampleRoleBasedComponent = () => {
  const { role, status } = useUserRole();

  // Don't render anything while loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Method 1: Simple conditional rendering
  const SimpleConditionalExample = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Method 1: Simple Conditionals
      </h3>
      {isAdmin(role) && (
        <div className="bg-red-100 p-3 rounded">
          <p>This content is only visible to admins</p>
        </div>
      )}

      {isClient(role) && (
        <div className="bg-blue-100 p-3 rounded">
          <p>This content is only visible to clients</p>
        </div>
      )}

      {isHealthWorker(role) && (
        <div className="bg-green-100 p-3 rounded">
          <p>This content is only visible to health workers</p>
        </div>
      )}
    </div>
  );

  // Method 2: Using renderByRole utility
  const RenderByRoleExample = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Method 2: Using renderByRole
      </h3>
      {renderByRole(role, {
        admin: (
          <div className="bg-red-100 p-3 rounded">
            <h4 className="font-medium">Admin Dashboard</h4>
            <p>Manage users, view all appointments, assign health workers</p>
          </div>
        ),
        client: (
          <div className="bg-blue-100 p-3 rounded">
            <h4 className="font-medium">Client Dashboard</h4>
            <p>Book appointments, view your bookings, contact health workers</p>
          </div>
        ),
        healthWorker: (
          <div className="bg-green-100 p-3 rounded">
            <h4 className="font-medium">Health Worker Dashboard</h4>
            <p>View assigned appointments, manage availability, update rates</p>
          </div>
        ),
        default: (
          <div className="bg-gray-100 p-3 rounded">
            <p>Please log in to access your dashboard</p>
          </div>
        ),
      })}
    </div>
  );

  // Method 3: Using permission-based rendering
  const PermissionBasedExample = () => {
    const config = getRoleConfig(role);

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Method 3: Permission-Based Actions
        </h3>
        <div className="flex gap-2">
          {config.canEdit && (
            <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaEdit /> Edit
            </button>
          )}

          {config.canDelete && (
            <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaTrash /> Delete
            </button>
          )}

          {config.canAssign && (
            <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaUserPlus /> Assign
            </button>
          )}

          {config.canViewAll && (
            <button className="bg-purple-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaEye /> View All
            </button>
          )}
        </div>
      </div>
    );
  };

  // Method 4: Using hasPermission for specific actions
  const SpecificPermissionExample = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Method 4: Specific Permissions
      </h3>

      {hasPermission(role, ["admin", "health-service"]) && (
        <div className="bg-yellow-100 p-3 rounded mb-2">
          <p>This is visible to both admins and health workers</p>
        </div>
      )}

      {hasPermission(role, ["admin"]) && (
        <div className="bg-red-100 p-3 rounded mb-2">
          <p>Admin-only content: Manage system settings</p>
        </div>
      )}

      {hasPermission(role, ["client", "health-service"]) && (
        <div className="bg-green-100 p-3 rounded">
          <p>Visible to clients and health workers: Appointment details</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Role-Based Content Examples</h2>
      <p className="mb-6 text-gray-600">
        Current Role: <strong>{role || "Not logged in"}</strong>
      </p>

      <SimpleConditionalExample />
      <RenderByRoleExample />
      <PermissionBasedExample />
      <SpecificPermissionExample />
    </div>
  );
};

export default ExampleRoleBasedComponent;
