import { definePlugin, ServerAPI, PanelSection, PanelSectionRow, staticClasses } from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

interface SSHInfo {
  ip: string;
  port: number;
  user: string;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const [sshInfo, setSshInfo] = useState<SSHInfo | null>(null);

  useEffect(() => {
    const fetchSSHInfo = async () => {
      const result = await serverAPI.callPluginMethod<{ ip: string; port: number; user: string }>("enable_ssh", {});
      if (result.success) {
        setSshInfo(result.result as SSHInfo);
      }
    };

    fetchSSHInfo();
  }, [serverAPI]);

  return (
    <PanelSection title="SSH Information">
      {sshInfo ? (
        <>
          <PanelSectionRow>
            <div className={staticClasses.Title}>IP: {sshInfo.ip}</div>
          </PanelSectionRow>
          <PanelSectionRow>
            <div className={staticClasses.Title}>Port: {sshInfo.port}</div>
          </PanelSectionRow>
          <PanelSectionRow>
            <div className={staticClasses.Title}>User: {sshInfo.user}</div>
          </PanelSectionRow>
        </>
      ) : (
        <PanelSectionRow>
          <div className={staticClasses.Title}>Loading...</div>
        </PanelSectionRow>
      )}
    </PanelSection>
  );
};

export default definePlugin((serverAPI: ServerAPI) => {
  return {
    title: <div>SSH Plugin</div>,
    content: <Content serverAPI={serverAPI} />,
    icon: <span>🔒</span>,
  };
});
