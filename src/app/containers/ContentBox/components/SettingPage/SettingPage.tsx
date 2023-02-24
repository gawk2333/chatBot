import React, { useState, useEffect, useCallback } from "react";
import { Transition, Form, Tab } from "semantic-ui-react";
import Slider from "rc-slider";
import Select from "../../../../components/MinimalMultiSelect";
import _ from "lodash";
import "rc-slider/assets/index.css";
import styles from "./SettingPage.module.css";
import { useAppSelector, useAppDispatch, AppDispatch } from "../../../../store";
import {
  PageState,
  pageTypes,
  SettingPageInfo,
  ChildSettingInfo,
  updateSettingContent,
} from "../../../../store/pageSlice";
import { MultiValue } from "react-select";

export default function SettingPage() {
  const pageState: PageState = useAppSelector((state) => {
    return state.page;
  });
  const dispatch: AppDispatch = useAppDispatch();
  const [showSettingPage, setShowSettingPage] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<any>([]);
  const [selectInputValue, setSelectInputValue] = useState<string>("");

  const getStopOptions = useCallback(() => {
    const stops = _.cloneDeep(pageState.pages.settingPage.chat.stop);
    const stopOptions = stops.map((s) => {
      return {
        label: s,
        value: s,
      };
    });
    setSelectOptions(stopOptions as never[]);
  }, [pageState.pages.settingPage.chat.stop]);

  useEffect(() => {
    getStopOptions();
  }, [getStopOptions]);

  useEffect(() => {
    setShowSettingPage(
      pageState.currentPage.some((page) => page === pageTypes.settingPage)
    );
  }, [pageState.currentPage]);

  type keyofSettingPageInfo = keyof SettingPageInfo;
  type keyofChildSettingInfo = keyof ChildSettingInfo;

  const handleValueChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | number[]
      | number
      | string[],
    key: keyofSettingPageInfo,
    keyofChild: keyofChildSettingInfo
  ) => {
    const payload: SettingPageInfo = _.cloneDeep(pageState.pages.settingPage);
    if (typeof payload[key][keyofChild] === "number" && typeof e === "number") {
      (payload[key][keyofChild] as number) = e;
    }
    if (typeof payload[key][keyofChild] === "string" && typeof e === "object") {
      (payload[key][keyofChild] as string) = (e as any).target.value;
    }
    if (typeof payload[key][keyofChild] === "object" && typeof e === "object") {
      (payload[key][keyofChild] as any) = e;
    }
    dispatch(updateSettingContent(payload));
  };

  const handleInputChange = (value: string) => {
    setSelectInputValue(value);
  };

  const handleSelectChange = (items: MultiValue<string>) => {
    const valueForUpdate = items.map((item) => {
      return (item as any).value;
    });
    handleValueChange(valueForUpdate, "chat", "stop");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (selectInputValue.length !== 0) {
        const stops: Array<string> = _.cloneDeep(
          pageState.pages.settingPage.chat.stop
        );
        stops.push(selectInputValue);
        handleValueChange(stops, "chat", "stop");
        setSelectInputValue("");
      }
    }
  };

  const panes = [
    {
      menuItem: "Text",
      render: () => (
        <Tab.Pane>
          <Form>
            <Form.TextArea
              label="prompt"
              rows={10}
              value={pageState.pages.settingPage.chat.prompt}
              onChange={(e) => handleValueChange(e, "chat", "prompt")}
            />
            <span>Stop sequence</span>
            <Select
              options={selectOptions}
              value={selectOptions}
              selectInputValue={selectInputValue}
              handleChange={(e) => handleSelectChange(e)}
              handleInputChange={(e) => handleInputChange(e)}
              handleKeyDown={(e) => handleKeyDown(e)}
              noOptionsMessage="Enter a sequence and press Enter"
            />
            <Form.Input
              label="temperature"
              value={pageState.pages.settingPage.chat.temperature}
              onChange={(e) => handleValueChange(e, "chat", "temperature")}
            />
            <Slider
              min={-2}
              max={2}
              marks={{ 0: { style: {}, label: <></> } }}
              step={0.01}
              value={pageState.pages.settingPage.chat.temperature}
              onChange={(e) => handleValueChange(e, "chat", "temperature")}
            />
            <Form.Input
              label="max token"
              value={pageState.pages.settingPage.chat.max_tokens}
              onChange={(e) => handleValueChange(e, "chat", "max_tokens")}
            />
            <Slider
              min={0}
              max={2048}
              step={1}
              value={pageState.pages.settingPage.chat.max_tokens}
              onChange={(e) => handleValueChange(e, "chat", "max_tokens")}
            />
            <Form.Input
              label="frequency penalty"
              value={pageState.pages.settingPage.chat.frequency_penalty}
              onChange={(e) =>
                handleValueChange(e, "chat", "frequency_penalty")
              }
            />
            <Slider
              min={-2.0}
              max={2.0}
              step={0.01}
              marks={{ 0: { style: {}, label: <></> } }}
              value={pageState.pages.settingPage.chat.frequency_penalty}
              onChange={(e) =>
                handleValueChange(e, "chat", "frequency_penalty")
              }
            />
            <Form.Input
              label="presence penalty"
              value={pageState.pages.settingPage.chat.presence_penalty}
              onChange={(e) => handleValueChange(e, "chat", "presence_penalty")}
            />
            <Slider
              min={-2.0}
              max={2.0}
              step={0.01}
              marks={{ 0: { style: {}, label: <></> } }}
              value={pageState.pages.settingPage.chat.presence_penalty}
              onChange={(e) => handleValueChange(e, "chat", "presence_penalty")}
            />
          </Form>
        </Tab.Pane>
      ),
    },
    { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  return (
    <Transition animation="slide left" visible={showSettingPage} duration={500}>
      <div className={styles.settingpage}>
        <div className={styles.title}>
          <h2>Setting</h2>
        </div>
        <Tab panes={panes} />
      </div>
    </Transition>
  );
}
