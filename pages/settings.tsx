import * as React from 'react';

// Style
import styles from '../styles/components/Settings.module.scss';

const list: string = 'settingsList';
const section: string = 'settingsSection';

const SettingsComponent: React.FC = () => (
  <>
    <h1 className="title">SETTINGS</h1>
    <div className="content size-small">
      <ul className={styles[`${list}`]}>
        <li>
          <button
            type="button"
            className={styles[`${list}__item`]}
          >
            <span>Update Data</span>
          </button>
        </li>
        <li>
          <div className={styles[`${section}`]}>
            <div>Save Data in Localstorage</div>
            <div className="chechbox">
              <input type="checkbox" />
              <label>Words</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>Record</label>
            </div>
            <div>
              <input type="checkbox" />
              <label>Update words when install</label>
            </div>
          </div>
        </li>
        <li>
          <a
            href="https://github.com/waveciou/WordsUp"
            className={styles[`${list}__item`]}
          >
            <span>GitHub</span>
          </a>
        </li>
      </ul>
    </div>
  </>
);

export default SettingsComponent;
