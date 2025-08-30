"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePasswordSchema } from "@schema/auth";
import { deleteUserProfileSchema } from "@schema/user";
import { updateUserPassword } from "@service/request/user/updateUserPassword";
import { enable2Fa, disable2Fa } from "@service/request/user/settings/2faAuth";
import { getUserSession } from "@service/request/user/settings/sessions";
import { logoutAllDeviceRequest } from "@service/request/auth/logoutAllDevices";
import { togglUserSettings } from "@service/request/user/settings/toggleSettings";
import { getUserSettings } from "@service/request/user/settings/getUserSettings";
import { deleteUserProfile } from "@service/request/user/settings/deleteProfile";
import { useUserContext } from "@context/userContext";
import { signOut as nextAuthSignOut } from "next-auth/react";
import {
  SecurityTab,
  NotificationsTab,
  AccountTab,
  PrivacyTab,
  DeleteAccountModal,
  Disable2FAModal,
} from "../client/settingsUi-kit";
import { FaBell, FaShieldAlt, FaCog, FaUser } from "react-icons/fa";

const Settings = () => {
  const { user, refetchUser, setUser } = useUserContext();
  const userDetails = user?.data;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("security");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisable2FAModal, setShowDisable2FAModal] = useState(false);

  // Fetch user settings from backend
  const {
    data: userSettings,
    isLoading: settingsLoading,
    refetch: refetchSettings,
  } = useQuery({
    queryKey: ["userSettings"],
    queryFn: getUserSettings,
    enabled: activeTab === "notifications" || activeTab === "privacy", // Fetch when settings tabs are active
  });

  // Settings state for notifications and privacy - initialize from backend data
  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    booking_reminders: true,
    marketing_updates: false,
    profile_visibility: true,
    activity_status: true,
    data_collection: false,
    third_party_cookies: false,
  });

  // Update local settings when backend data is loaded
  React.useEffect(() => {
    if (userSettings?.data) {
      setSettings(userSettings.data);
    }
  }, [userSettings]);

  // Fetch user sessions
  const { data: userSessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["userSessions"],
    queryFn: getUserSession,
    enabled: activeTab === "security", // Only fetch when security tab is active
  });

  // Password update mutation
  const passwordMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update password");
    },
  });

  // 2FA enable mutation
  const enable2FaMutation = useMutation({
    mutationFn: enable2Fa,
    onSuccess: () => {
      toast.success("2FA enabled successfully");
      refetchUser(); // Refresh user data to get updated 2FA status
    },
    onError: (err) => {
      toast.error(err.message || "Failed to enable 2FA");
    },
  });

  // 2FA disable mutation
  const disable2FaMutation = useMutation({
    mutationFn: disable2Fa,
    onSuccess: () => {
      toast.success("2FA disabled successfully");
      refetchUser(); // Refresh user data to get updated 2FA status
    },
    onError: (err) => {
      toast.error(err.message || "Failed to disable 2FA");
    },
  });

  const handle2FAToggle = () => {
    if (userDetails?.two_fa_enabled) {
      // Show password confirmation modal for disabling 2FA
      setShowDisable2FAModal(true);
    } else {
      // Enable 2FA directly
      enable2FaMutation.mutate();
    }
  };

  const handleDisable2FAConfirm = (password) => {
    disable2FaMutation.mutate(password, {
      onSuccess: () => {
        setShowDisable2FAModal(false);
      },
      onError: () => {
        // Keep modal open on error so user can try again
      },
    });
  };

  // Logout all devices mutation
  const logoutAllDevicesMutation = useMutation({
    mutationFn: logoutAllDeviceRequest,
    onSuccess: async () => {
      // Clear query cache and sign out
      await nextAuthSignOut({ callbackUrl: "/signin", redirect: true });
      queryClient.clear();
      setUser(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to logout from all devices");
    },
  });

  // Delete account mutation
  const deleteAccountMutation = useMutation({
    mutationFn: deleteUserProfile,
    onSuccess: async () => {
      toast.success("Account deleted successfully");
      // Clear query cache and sign out
      queryClient.clear();
      setUser(null);
      await nextAuthSignOut({ callbackUrl: "/", redirect: true });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete account");
    },
  });

  const handleLogoutAllDevices = () => {
    if (
      window.confirm(
        "Are you sure you want to logout from all devices? You will be redirected to login."
      )
    ) {
      logoutAllDevicesMutation.mutate();
    }
  };

  const handleDeleteAccount = (values, { resetForm }) => {
    deleteAccountMutation.mutate(values.reason, {
      onSuccess: () => {
        setShowDeleteModal(false);
        resetForm();
      },
    });
  };

  // Settings update mutation
  const settingsMutation = useMutation({
    mutationFn: (settingsData) => togglUserSettings(settingsData),
    onSuccess: () => {
      toast.success("Updated");
      refetchSettings(); // Refresh settings data to stay in sync
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update settings");
      // Revert the local state on error
      refetchSettings();
    },
  });

  const handleSettingToggle = (settingKey, value) => {
    // Optimistically update the UI
    const newSettings = { ...settings, [settingKey]: value };
    setSettings(newSettings);

    // Send only the changed setting to the backend
    settingsMutation.mutate({ [settingKey]: value });
  };

  const handlePasswordUpdate = (values, { resetForm }) => {
    passwordMutation.mutate(values, {
      onSuccess: () => {
        resetForm();
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      },
    });
  };

  const tabs = [
    {
      id: "security",
      label: "Security",
      icon: <FaShieldAlt />,
      description: "Password and account security",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FaBell />,
      description: "Manage your notification preferences",
    },
    {
      id: "account",
      label: "Account",
      icon: <FaUser />,
      description: "Account settings and preferences",
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: <FaCog />,
      description: "Privacy and data settings",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "security":
        return (
          <SecurityTab
            userDetails={userDetails}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            passwordMutation={passwordMutation}
            handlePasswordUpdate={handlePasswordUpdate}
            enable2FaMutation={enable2FaMutation}
            disable2FaMutation={disable2FaMutation}
            handle2FAToggle={handle2FAToggle}
            userSessions={userSessions}
            sessionsLoading={sessionsLoading}
            handleLogoutAllDevices={handleLogoutAllDevices}
            logoutAllDevicesMutation={logoutAllDevicesMutation}
            changePasswordSchema={changePasswordSchema}
          />
        );

      case "notifications":
        return (
          <NotificationsTab
            settings={settings}
            settingsLoading={settingsLoading}
            handleSettingToggle={handleSettingToggle}
            settingsMutation={settingsMutation}
          />
        );

      case "account":
        return (
          <AccountTab
            userDetails={userDetails}
            setShowDeleteModal={setShowDeleteModal}
          />
        );

      case "privacy":
        return (
          <PrivacyTab
            settings={settings}
            settingsLoading={settingsLoading}
            handleSettingToggle={handleSettingToggle}
            settingsMutation={settingsMutation}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto px-1 py-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <nav className="space-y-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-carer-blue text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-base">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{tab.label}</div>
                      <div
                        className={`text-xs mt-1 ${
                          activeTab === tab.id
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>

        {/* Delete Account Modal */}
        <DeleteAccountModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteUserProfileSchema={deleteUserProfileSchema}
          handleDeleteAccount={handleDeleteAccount}
          deleteAccountMutation={deleteAccountMutation}
        />

        {/* Disable 2FA Modal */}
        <Disable2FAModal
          showModal={showDisable2FAModal}
          setShowModal={setShowDisable2FAModal}
          onConfirm={handleDisable2FAConfirm}
          isLoading={disable2FaMutation.isPending}
        />
      </div>
    </div>
  );
};

export default Settings;
