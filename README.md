# What is Spores Kit

*Spores Kit* allows you to bring a *Spore* into your site, and customize the experience.
For more information about *Spores*, go to the [spores.vision](https://spores.vision).

The accompanying Zora x ETHGlobal presention slides can be found [here](https://www.figma.com/proto/ucetVWnSHufW7N2ZklNwaC/Spores-Presentation?node-id=12%3A420&scaling=contain&page-id=0%3A1);


# Setting Up

To get started, clone the repo onto your computer and go to the directory and run:
### `yarn install`
### `npm start`

Once you've run `npm start`,  go to `localhost:3000` in your browser. You'll be greeted 
with a *Spore player* running on a blank page.


# Usage

The file `src/App.js` shows examples of how to use the Spores Kit.

The `SporesEmbed` component is the heart of the library. It adds a *Spore* Player— as an IFrame embed—
to the page.

## Loading 1 Song

To load 1 song to the player, pass a URL (of a `WAV` or `MP3` file) via the `main` prop in the component.
This will set the `Main Track` of the Spore.

```TSX
<SporeEmbed main={mainSongURL} /> 
```

## Notes on URL Formatting
* The URL must be a valid URL.
* For example, `ipfs://QmXYZ...` will **not** work. 
* However, `https://pinata.mycloud/ipfs/QmXYZ...` will work fine (because its a valid URL).
* If you can go to that link in your browser, then it will work in the Spore.
* Some NFT metadata uses the ipfs://QmXYZ URL format, so please validate!

## Loading 2 Songs (DJ Style)

Spores Kit supports mixing 2 songs together, like a DJ mixer. They can be set as props in `SporesEmbed`.
1. **main**:  The track that plays by default.
2. **alternate**:  An alternate track that can be cross-faded in, mixing with the **main track**.

As code this looks like:
```TSX
<SporeEmbed main={mainSongURL} alternate={alternateSongURL} />
```

Notes:
* You can change the `main` and `alternate` tracks while playing. Playback will not interrupt.
* The *Spore* needs to fetch songs, which might take a little time depending on file size.
* On the *Spore* player, the *bottom-right slider* controls the cross-fade between the `main` and `alternate` tracks.

## Juice Loops

The *Spore* player supports mixing in your own loops. We call these *Juice Loops*. Think of it as a sample bank-- a list of samples-- that can add variation to a mix.

You can set the list of *Juice Loops* via a prop in the `SporeEmbed` component.

```TSX
let juiceSamples = [SAMPLE_URL_1, SAMPLE_URL_2, SAMPLE_URL_3];

return (
    <SporeEmbed main={mainSongURL} alternate={alternateSongURL} juiceSamples={juiceSamples}/>
);
```

Notes:
* The **juiceSamples** prop should be a list of URLs to `MP3` and `WAV` sample files.
* The URL formatting from before applies here (refer to the URL formatting section, above).
* *Drum breaks* and *percussive loops* are ideal here, as they are "key agnostic" (they won't create dissonance).
* The *Spore* will attempt to detect the BPM for each sample.

## Theming

You customize the color of the *Waveform* & *Play-Button* that shows below the player, via the **color** prop.

You customize the background color of the *Spore* player itself, via the **backgroundColor** prop.

You can also set any image as the skin, via the **skin** prop.

```TSX
<SporeEmbed main={mainSongURL} alternate={alternateSongURL} skin={urlToSkin} color={"#ffffff"}/>
```

## Full Spec. of Props

| Prop Name | Description |
| ------------- | ------------- |
| main | URL to *main* audio track |
| alternate  | URL to *alternate* audio track (to be cross-faded) |
| juiceSamples | list of URLs of additional samples |
| color | color of the waveform (in HEX format) |
| backgroundColor | color of the player background (in HEX format) |
| skin | URL to an image to be used as a distorted skin |

## Diagram of the *Spore* Controls

![yo](https://zequencer.mypinata.cloud/ipfs/QmdHeZq7U2YFRzrVr1YgqgqjLcNNUGownNzxwJR7esx1ZV)

## Potential Ideas

### Web 3 DJ Decks
Use the [Zora API](https://api.zora.co/) to dig for tracks that mix well together. Passing them as **main** and **alternate** tracks.

Since you can switch tracks without interrupting playback, you could create a web3 DJ deck, where you queue tracks and swap them in at will. The surrounding front-end is yours to imagine, but taking inspo from DJ gear would be tight. 


### Ambience Machine

You're free to use any sound you like, so why not mint a few field recordings using Zora Editions and use those sounds with the Spore Kit, creating a calming ambient fog machine?

Playing around with theming can further induce feelings of calm.


### Cover Art

What if you piped the cover art of tracks you play into the spore itself, using the **skin** prop. The Zora API makes it easy to grab cover art for pieces of music.


### New Formats

The combination of props passed to a `Spore Embed` can be thought of as *sounds that work well together*. What if you serialized these attributes to a JSON and stored them on IPFS? These combinations are now portable and shareable, essentially a new music format.

If your front-end can receive these JSONs and display them in a cool way, loading them into the player, you could even create an interactive playlist (by storing the songs as arrays instead of single values).

