"use client";
import React from "react";
import { PrivacySkeleton } from "@components/core/skeleton/settings";
import { PrivacyTabMenu } from "@constants";

const PrivacyTab = ({
  settings,
  settingsLoading,
  handleSettingToggle,
  settingsMutation,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Privacy Settings
        </h3>

        {settingsLoading ? (
          <PrivacySkeleton />
        ) : (
          <div className="space-y-4">
            {PrivacyTabMenu.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings[item.key]}
                    onChange={(e) =>
                      handleSettingToggle(item.key, e.target.checked)
                    }
                    disabled={settingsMutation.isPending}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carer-blue peer-disabled:opacity-50"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {settingsMutation.isPending && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Updating settings...</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Download Your Data
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Request a copy of all your personal data stored on our platform.
        </p>
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
          Request Data Export
        </button>
      </div>
    </div>
  );
};

export default PrivacyTab;
