import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { Tabs, Tab, Box } from "@mui/material";
// import "../blocks/sql_blocks"; // Importez le bloc personnalisé ici

// Déclarer les types JSX pour XML (nécessaire pour TypeScript)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      xml: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { xmlns?: string };
    }
  }
}

const STORAGE_KEY = "blocklyWorkspaceState";

const BlocklyPage: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [serializedContent, setSerializedContent] = useState<string>("");
  const [javascriptCode, setJavascriptCode] = useState<string>("");
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const toolbox = `
        <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
                <category name="Custom Blocks" colour="#8007f2">
                <block type="dicts_get"></block> 
            <block type="select"></block> 
        </category>
            <category name="Logic" colour="#5C81A6">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
                <block type="logic_null"></block>
            </category>
            <category name="Loops" colour="#5CA65C">
                <block type="controls_repeat_ext"></block>
                <block type="controls_whileUntil"></block>
                <block type="controls_for"></block>
                <block type="controls_forEach"></block>
                <block type="controls_flow_statements"></block>
            </category>
            <category name="Math" colour="#5C68A6">
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
                <block type="math_trig"></block>
                <block type="math_constant"></block>
                <block type="math_number_property"></block>
                <block type="math_round"></block>
                <block type="math_on_list"></block>
                <block type="math_modulo"></block>
                <block type="math_constrain"></block>
                <block type="math_random_int"></block>
                <block type="math_random_float"></block>
            </category>
            <category name="Text" colour="#5CA68D">
                <block type="text"></block>
                <block type="text_join"></block>
                <block type="text_append"></block>
                <block type="text_length"></block>
                <block type="text_isEmpty"></block>
                <block type="text_indexOf"></block>
                <block type="text_charAt"></block>
                <block type="text_getSubstring"></block>
                <block type="text_changeCase"></block>
                <block type="text_trim"></block>
                <block type="text_print"></block>
                <block type="text_prompt_ext"></block>
            </category>
            <category name="Lists" colour="#745CA6">
                <block type="lists_create_with"></block>
                <block type="lists_repeat"></block>
                <block type="lists_length"></block>
                <block type="lists_isEmpty"></block>
                <block type="lists_indexOf"></block>
                <block type="lists_getIndex"></block>
                <block type="lists_setIndex"></block>
                <block type="lists_getSublist"></block>
                <block type="lists_split"></block>
                <block type="lists_sort"></block>
            </category>
            <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
            <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
        </xml>
    `;

  const saveToLocalStorage = (xmlString: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, xmlString);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde dans localStorage:", error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.error("Erreur lors de la lecture depuis localStorage:", error);
      return null;
    }
  };

  const serializeWorkspace = (workspace: Blockly.WorkspaceSvg) => {
    try {
      const xmlDom = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
      setSerializedContent(xmlText);

      saveToLocalStorage(xmlText);

      const jsCode = javascriptGenerator.workspaceToCode(workspace);
      setJavascriptCode(jsCode);
    } catch (error) {
      console.error("Erreur lors de la sérialisation:", error);
    }
  };

  useEffect(() => {
    const workspace = Blockly.inject(blocklyDiv.current!, {
      toolbox: Blockly.utils.xml.textToDom(toolbox),
      grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      trashcan: true,
      move: { scrollbars: true, drag: true, wheel: true },
      theme: Blockly.Themes.Classic,
    });

    workspaceRef.current = workspace;

    const savedState = loadFromLocalStorage();
    if (savedState) {
      try {
        const xmlDom = Blockly.utils.xml.textToDom(savedState);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, workspace);
        serializeWorkspace(workspace);
      } catch (error) {
        console.error("Erreur lors de la restauration de l'état:", error);
      }
    }

    const onChangeListener = () => {
      serializeWorkspace(workspace);
    };

    workspace.addChangeListener((e) => {
      if (
        e.type === Blockly.Events.BLOCK_CHANGE ||
        e.type === Blockly.Events.BLOCK_CREATE ||
        e.type === Blockly.Events.BLOCK_DELETE ||
        e.type === Blockly.Events.BLOCK_MOVE
      ) {
        onChangeListener();
      }
    });

    workspace.scrollCenter();

    return () => {
      serializeWorkspace(workspace);
      workspace.dispose();
    };
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleClearWorkspace = () => {
    if (workspaceRef.current) {
      workspaceRef.current.clear();
      localStorage.removeItem(STORAGE_KEY);
      setSerializedContent("");
      setJavascriptCode("");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Blockly Editor</h1>
        <button
          onClick={handleClearWorkspace}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Workspace
        </button>
      </div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Visual Editor" />
        <Tab label="XML Code" />
        <Tab label="JavaScript Code" />
      </Tabs>
      <Box hidden={activeTab !== 0} style={{ height: "500px" }}>
        <div ref={blocklyDiv} style={{ height: "100%" }}></div>
      </Box>
      <Box hidden={activeTab !== 1} style={{ padding: "20px" }}>
        <h3>Serialized XML:</h3>
        <pre
          style={{
            background: "#000000",
            padding: "10px",
            borderRadius: "4px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {serializedContent}
        </pre>
      </Box>
      <Box hidden={activeTab !== 2} style={{ padding: "20px" }}>
        <h3>Generated JavaScript:</h3>
        <pre
          style={{
            background: "#000000",
            padding: "10px",
            borderRadius: "4px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {javascriptCode}
        </pre>
      </Box>
      1{" "}
    </div>
  );
};

export default BlocklyPage;
