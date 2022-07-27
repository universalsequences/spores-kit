import logo from './logo.svg';
import './App.css';
import {SporeEmbed} from './lib/components/SporeEmbed.js';
import styles from './styles.module.css';

let songs = [
    "https://catalog.mypinata.cloud/ipfs/QmbvUVdh5SiX5mRdMUR1s4Kg6eMfddbXYcJpf2spcNedEY", // DJ Planet Express - Weak
    "https://catalog.mypinata.cloud/ipfs/QmVNy1g26zVfCQWPYsuSKhq2ie4f8S3WpM6EthSjtLcU1i", // allem iversom - "where it's warm"
    "https://catalog.mypinata.cloud/ipfs/QmWWwDepZfDKqypi5DXzYzGk7tVCdpDaTPLFSysA3PBRrm", // Dutchyyy
];
function App() {
    // mix 2 different songs together, using the main song's bpm (alternate song gets timestretched to match
    // the BPM of main song)

    let main = songs[0]; 
    let alternate = songs[1]; 

    return (
        <div className={styles["test-container"]}>
          <SporeEmbed color="blue" main={main} alternate={alternate}/>
        </div>
  );
}

export default App;
