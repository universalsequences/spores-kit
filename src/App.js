import {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import {SporeEmbed} from './lib/components/SporeEmbed.js';
import styles from './styles.module.css';

// A list of songs: grabbed directly from catalog, but could use Zora API here.
let songs = [
    "https://catalog.mypinata.cloud/ipfs/QmbvUVdh5SiX5mRdMUR1s4Kg6eMfddbXYcJpf2spcNedEY", // DJ Planet Express - Weak
    "https://catalog.mypinata.cloud/ipfs/QmVNy1g26zVfCQWPYsuSKhq2ie4f8S3WpM6EthSjtLcU1i", // allem iversom - "where it's warm"
    "https://catalog.mypinata.cloud/ipfs/QmWWwDepZfDKqypi5DXzYzGk7tVCdpDaTPLFSysA3PBRrm", // Dutchyyy
];

let skin = "https://zequencer.mypinata.cloud/ipfs/Qme7hXVjGevN7fReT2tcErkyuNzczHdsrcCnMwkeDZfkx5";

let juiceSamples = [
    "https://zequencer.io/ipfs/QmYh8ryEJ5X3RD4wwkuRpyhgXwiQdWsqmfwgDhUtE4qonZ",
    "https://zequencer.io/ipfs/Qmc43UqNSmcePMaLNP1PCK2rHRmYDJkvMPw2j5xxhWSAWi",
    "https://zequencer.io/ipfs/QmPrtDNY42aiJGLAMp2u2C9CYfFHADv6MA8ETQ29E8LYbV",
];

function App() {
    // mix 2 different songs together:
    // using the main song's bpm (alternate song gets timestretched to match
    // the BPM of main song)

    let [main, setMain] = useState(songs[0]);
    let [alternate, setAlternate] = useState(songs[1]);

    const onClickNext=  useCallback(() => {
        let index = songs.indexOf(alternate);
        index = (index + 1) % songs.length;
        setAlternate(songs[index]);
    }, [alternate, setAlternate]);

    // bottom right slider controls cross-fade between main & alternate
    return (
        <div className={styles["test-container"]}>
          <div
            onClick={onClickNext}
            className="next-song">
            Next Track
          </div>
          <SporeEmbed backgroundColor="black" color="blue" skin={skin} main={main} alternate={alternate} juiceSamples={juiceSamples}/>
        </div>
  );
}

export default App;
