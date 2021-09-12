import * as React from 'react';
import { useEffect } from 'react';
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

// Style
import styles from '../styles/components/Settings.module.scss';

const list: string = 'settings-list';
const section: string = 'settings-section';

const SettingsComponent: React.FC = () => {
  const handleGetData = HandleGetGoogleSheetData();
  const {
    saveWords,
    saveRecord,
    updateInstall,
    saveOption,
  } = useSelector((state: RootState) => state.settingsOption.value);
  const dispatch = useDispatch();

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
              <div>
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
                  id="save-record-data"
                  title="測驗紀錄"
                  status={saveRecord}
                  onChange={(event) => {
                    const result: boolean = event.target.checked;
                    dispatch(setOptionSaveRecord(result));
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
            <div className={styles[`${section}`]}>
              <Checkbox
                id="update-when-install"
                title="載入時更新單字資料庫"
                status={updateInstall}
                onChange={(event) => {
                  const result: boolean = event.target.checked;
                  dispatch(setOptionUpdateInstall(result));
                }}
              />

            </div>
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
    </>
  );
};

export default SettingsComponent;
