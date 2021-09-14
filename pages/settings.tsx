import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../store';
import {
  setOptionSaveWords,
  setOptionSaveRecord,
  setOptionUpdateInstall,
  setOptionSaveOption,
} from '../store/slice/settingsOptionSlice';

// Functions
import HandleGetGoogleSheetData from '../src/functions/handleGetGoogleSheetData';

// Component
import { Checkbox } from '../components/common/Form';
import Alert from '../components/common/Alert';

// Style
import styles from '../styles/components/Settings.module.scss';

const list: string = 'settings-list';
const section: string = 'settings-section';

const SettingsComponent: React.FC = () => {
  const handleGetData = HandleGetGoogleSheetData();
  const {
    saveWords = false,
    saveRecord = false,
    updateInstall = true,
    saveOption = true,
  } = useSelector((state: RootState) => state.settingsOption.value);
  const dispatch = useDispatch();

  const [alertDeleteRecord, setAlertDeleteRecord] = useState(false);
  const [alertClearStorage, setAlertClearStorage] = useState(false);

  // useEffect(() => {
  //   if (saveWords === true) {
  //     dispatch(setOptionUpdateInstall(true));
  //   }
  // }, [dispatch, saveWords]);

  return (
    <>
      <h1 className="title">SETTINGS</h1>
      <div className="content size-small">
        <ul className={styles[`${list}`]}>
          <li>
            <button
              type="button"
              className={`
                ${styles['settings-link']}
                ${styles['settings__has-icon']}
                ${styles['icon-update']}
              `}
              onClick={handleGetData}
            >
              <span>更新單字資料庫</span>
            </button>
          </li>
          <li>
            <div className={styles[`${section}`]}>
              <div
                className={`
                ${styles['settings__has-icon']}
                ${styles['icon-storage']}
              `}
              >
                <span>將資料儲存於 LocalStorage</span>
              </div>

              <div className={styles[`${section}__content`]}>
                <Checkbox
                  id="save-words-data"
                  title="單字資料庫"
                  status={saveWords}
                  onChange={(event) => {
                    const result: boolean = event.target.checked;
                    dispatch(setOptionSaveWords(result));
                  }}
                />

                <Checkbox
                  id="update-when-install"
                  title="載入時更新單字資料庫"
                  status={updateInstall}
                  disabled={saveWords === false}
                  onChange={(event) => {
                    const result: boolean = event.target.checked;
                    dispatch(setOptionUpdateInstall(result));
                  }}
                />

                <Checkbox
                  id="save-record-data"
                  title="測驗紀錄"
                  status={saveRecord}
                  onChange={(event) => {
                    const result: boolean = event.target.checked;
                    if (result === true) {
                      dispatch(setOptionSaveRecord(result));
                    } else {
                      setAlertDeleteRecord(true);
                    }
                  }}
                />

                <Checkbox
                  id="settings-option"
                  title="設定"
                  status={saveOption}
                  onChange={(event) => {
                    const result: boolean = event.target.checked;
                    dispatch(setOptionSaveOption(result));
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <button
              type="button"
              className={`
                ${styles['settings-link']}
                ${styles['settings__has-icon']}
                ${styles['icon-clearall']}
              `}
              onClick={() => {
                setAlertClearStorage(true);
              }}
            >
              <span>清除所有 LocalStorage 的資料</span>
            </button>
          </li>
          <li>
            <a
              href="https://github.com/waveciou/WordsUp"
              className={`
                ${styles['settings-link']}
                ${styles['settings__has-icon']}
                ${styles['icon-github']}
              `}
            >
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>

      <Alert
        show={alertDeleteRecord}
        title="確定要清除所有測驗紀錄？"
        content="清除後將不可回復"
        confirmText="清除"
        cancelText="取消"
        onConfirm={() => {
          dispatch(setOptionSaveRecord(false));
          setAlertDeleteRecord(false);
        }}
        onCancel={() => {
          dispatch(setOptionSaveRecord(true));
          setAlertDeleteRecord(false);
        }}
      />

      <Alert
        show={alertClearStorage}
        title="確定要清除所有 LocalStorage 的資料？"
        content="清除後將不可回復"
        confirmText="清除"
        cancelText="取消"
        onConfirm={() => {
          setAlertClearStorage(false);
        }}
        onCancel={() => {
          setAlertClearStorage(false);
        }}
      />
    </>
  );
};

export default SettingsComponent;
