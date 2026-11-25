import { useRef, useState, useEffect } from "react";
import "./App.css";

const songs = {
  main: { src: "/tum-se-hi.mp3", title: "तुम से ही ♡" },
  letter: { src: "/apna-bana-le.mp3", title: "अपना बना ले ♡" },
  slideshow: { src: "/ve-haaniya.mp3", title: "वे हानियाँ ♡" },
  final: { src: "/janam-janam.mp3", title: "जनम जनम ♡" },
};

const photos = [
  {
    src: "/mama-mami.jpg",
    alt: "मामा और मामी की प्यारी तस्वीर",
  },
  {
    src: "/mama-mami1.jpg",
    alt: "मामा और मामी की एक और खूबसूरत तस्वीर",
  },
];

export default function App() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState("main");
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [slideshowStarted, setSlideshowStarted] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);

  const playSong = async (songKey, shouldPlay = true) => {
    const audio = audioRef.current;
    if (!audio) return;

    const song = songs[songKey];
    if (!song) return;

    const songChanged = currentSong !== songKey;

    setCurrentSong(songKey);

    if (songChanged) {
      audio.src = song.src;
      audio.load();
    }

    if (!shouldPlay) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error("गाना नहीं चल पाया:", error);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error("गाना नहीं चल पाया:", error);
    }
  };

  const openLetter = () => {
    setLetterOpen(true);
    playSong("letter");
  };

  const closeLetter = () => {
    const audio = audioRef.current;
    const wasPlaying = audio ? !audio.paused : false;

    setLetterOpen(false);
    playSong("main", wasPlaying);
  };

  const startSlideshow = () => {
    setSlideshowStarted(true);
    setFinalMessage(false);
    setCurrentPhoto(0);
    playSong("slideshow");
  };

  const showFinalMessage = () => {
    setFinalMessage(true);
    playSong("final");

    setTimeout(() => {
      document.getElementById("final-message")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <main className="anniversary-site">
      <audio
        ref={audioRef}
        src={songs.main.src}
        loop
        preload="metadata"
      />

      {/* Floating hearts */}
      <div className="floating-heart heart-one">♡</div>
      <div className="floating-heart heart-two">♡</div>
      <div className="floating-heart heart-three">♡</div>

      {/* Navigation */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-heart">♡</span>
          प्यार का खूबसूरत उत्सव
        </div>

        <button className="music-toggle" onClick={toggleMusic}>
          <span className={`sound-icon ${isPlaying ? "playing" : ""}`}>
            {isPlaying ? "♫" : "♪"}
          </span>
          {isPlaying ? "गाना रोकें" : "गाना सुनें"}
        </button>
      </header>

      {/* Hero section */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            एक खास दिन <span>♡</span> एक खूबसूरत रिश्ता
          </p>

          <h1>
            शादी की
            <br />
            सालगिरह मुबारक,
            <br />
            <span>मामा और मामी</span>
          </h1>

          <div className="hero-divider">
            <span />
            ♡
            <span />
          </div>

          <p className="hero-hindi">
            आपका साथ यूँ ही बना रहे,
            <br />
            हर दिन प्यार से रोशन रहे।
          </p>

          <p className="hero-subtitle">
            आपके खूबसूरत रिश्ते, अटूट विश्वास और
            हमेशा साथ निभाने वाले प्यार को समर्पित।
          </p>

          <button
            className="primary-button"
            onClick={() => scrollToSection("love-section")}
          >
            आपके लिए कुछ खास <span>♡</span>
          </button>

          <p className="handwritten">ढेर सारे प्यार के साथ</p>
        </div>

        {/* Hero photo */}
        <div className="hero-visual">
          <div className="photo-halo" />

          <span className="photo-sparkle sparkle-one">✧</span>
          <span className="photo-sparkle sparkle-two">✧</span>

          <div className="photo-frame">
            <div className="photo-inner">
              <img
                className="couple-photo"
                src="/mama-mami.jpg"
                alt="मामा और मामी की प्यारी तस्वीर"
              />
            </div>
          </div>

          <div className="photo-caption">
            <span className="caption-heart">♡</span>
            <div>
              <p>साथ से खूबसूरत कुछ भी नहीं</p>
              <span>प्यार और यादों का जीवनभर का सफर</span>
            </div>
          </div>
        </div>

        <div
          className="scroll-cue"
          onClick={() => scrollToSection("love-section")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              scrollToSection("love-section");
            }
          }}
        >
          <span />
          आगे बढ़ें
          <span />
        </div>
      </section>

      {/* Wishes */}
      <section className="love-section" id="love-section">
        <div className="section-heading">
          <p className="eyebrow">दिल से निकली शुभकामनाएँ</p>

          <h2>
            आपका रिश्ता
            <br />
            <span>हमेशा महकता रहे</span>
          </h2>

          <p className="section-intro">
            कुछ रिश्ते अपने प्यार से पूरी दुनिया को
            खूबसूरत बना देते हैं। आपका रिश्ता भी ऐसा ही है।
          </p>
        </div>

        <div className="wishes-grid">
          <article className="wish-card">
            <div className="wish-icon">♡</div>
            <p className="wish-number">०१ — हमेशा का साथ</p>
            <h3>अनमोल प्यार</h3>
            <p>
              आपका प्यार हर साल और भी गहरा हो,
              और आपका साथ हमेशा बना रहे।
            </p>
          </article>

          <article className="wish-card featured-card">
            <div className="wish-icon">✧</div>
            <p className="wish-number">०२ — खुशियाँ</p>
            <h3>खुशियों भरे पल</h3>
            <p>
              आपकी ज़िंदगी हँसी, मुस्कान और
              खूबसूरत यादों से भरी रहे।
            </p>
          </article>

          <article className="wish-card">
            <div className="wish-icon">∞</div>
            <p className="wish-number">०३ — जीवनभर का साथ</p>
            <h3>हमेशा साथ</h3>
            <p>
              हर मुश्किल में एक-दूसरे का सहारा बनें
              और हर खुशी साथ मिलकर मनाएँ।
            </p>
          </article>
        </div>
      </section>

      {/* Heartfelt letter */}
      <section className="letter-section" id="letter-section">
        <span className="letter-decoration decoration-left">♡</span>
        <span className="letter-decoration decoration-right">✧</span>

        <div className="letter-content">
          <p className="eyebrow">
            आप दोनों के नाम एक छोटी-सी चिट्ठी
          </p>

          <h2>
            दिल की
            <br />
            <span>कुछ प्यारी बातें</span>
          </h2>

          {!letterOpen ? (
            <>
              <p className="letter-teaser">
                कुछ बातें ऐसी होती हैं, जो सीधे दिल से
                निकलकर दिल तक पहुँचती हैं...
              </p>

              <button className="letter-button" onClick={openLetter}>
                चिट्ठी खोलें <span>♡</span>
              </button>
            </>
          ) : (
            <div className="revealed-letter">
              <div className="letter-top-heart">♡</div>

              <p>प्यारे मामा और मामी,</p>

              <p>
                आप दोनों का रिश्ता हमारे लिए प्यार,
                विश्वास और एक-दूसरे का साथ निभाने की
                एक खूबसूरत मिसाल है। आपकी मुस्कान और
                एक-दूसरे की परवाह देखकर दिल को बहुत खुशी मिलती है।
              </p>

              <p>
                दिल से यही दुआ है कि आपकी ज़िंदगी का हर दिन
                नई खुशियाँ लेकर आए। आपके चेहरे पर हमेशा
                मुस्कान रहे और आपका प्यार समय के साथ
                और भी गहरा होता जाए।
              </p>

              <p>
                आप हमेशा एक-दूसरे का हाथ थामे रहें,
                साथ हँसते रहें और जीवन के हर छोटे-बड़े
                पल को खूबसूरत बनाते रहें।
              </p>

              <p>
                भगवान आपके रिश्ते को हमेशा खुशियों,
                प्रेम और आशीर्वाद से भरपूर रखें।
                आपके जीवन में कभी प्यार की कमी न हो।
              </p>

              <p className="letter-signoff">
                ढेर सारा प्यार और शुभकामनाएँ,
                <br />
                <span>आप दोनों के लिए, दिल से ♡</span>
              </p>

              <p className="letter-signature">
                ढेर सारे प्यार के साथ,
                <br />
                आपकी रिनी ❤️
              </p>

              <button
                className="letter-button close-letter"
                onClick={closeLetter}
              >
                चिट्ठी बंद करें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Photo slideshow */}
      <section className="love-section" id="slideshow-section">
        <div className="section-heading">
          <p className="eyebrow">प्यार भरी यादें</p>

          <h2>
            कुछ खूबसूरत
            <br />
            <span>यादें आप दोनों के नाम</span>
          </h2>

          <p className="section-intro">
            दो तस्वीरें, अनगिनत यादें और जीवनभर का साथ। ♡
          </p>
        </div>

        <div className="photo-frame">
          <div className="photo-inner">
            <img
              className="couple-photo"
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
            />
          </div>
        </div>

        <p className="section-intro">
          {currentPhoto + 1} / {photos.length} ♡
        </p>

        <div className="wishes-grid">
          <button
            className="letter-button"
            onClick={() =>
              setCurrentPhoto(
                (currentPhoto + photos.length - 1) % photos.length
              )
            }
          >
            पिछली तस्वीर
          </button>

          <button
            className="letter-button"
            onClick={() =>
              setCurrentPhoto((currentPhoto + 1) % photos.length)
            }
          >
            अगली तस्वीर ♡
          </button>
        </div>

        {!slideshowStarted ? (
          <button
            className="primary-button"
            onClick={startSlideshow}
          >
            यादों का सफर शुरू करें ♡
          </button>
        ) : (
          <button
            className="primary-button"
            onClick={showFinalMessage}
          >
            अंतिम शुभकामना देखें ♡
          </button>
        )}
      </section>

      {/* Final anniversary message */}
      <footer className="site-footer" id="final-message">
        <div className="footer-heart">♡</div>

        {finalMessage ? (
          <>
            <p className="eyebrow">आप दोनों के लिए एक आखिरी धुन</p>

            <p className="footer-main">
              कुछ प्रेम कहानियाँ हमेशा खूबसूरत रहती हैं।
            </p>

            <p className="footer-hindi">
              प्यारे मामा और मामी, आपकी ज़िंदगी का हर आने वाला साल
              पहले से भी ज़्यादा प्यार, हँसी और खुशियाँ लेकर आए।
              आपका साथ यूँ ही जीवनभर बना रहे।
            </p>

            <p className="footer-main">
              सालगिरह मुबारक! ❤️
            </p>
          </>
        ) : (
          <>
            <p className="footer-main">
              कुछ प्रेम कहानियाँ हमेशा खूबसूरत रहती हैं।
            </p>

            <p className="footer-hindi">
              मामा और मामी, आप हमेशा खुश रहें और
              यूँ ही एक-दूसरे के साथ मुस्कुराते रहें।
            </p>
          </>
        )}

        <div className="footer-divider">♡ ✧ ♡</div>

        <p className="footer-small">
          मामा और मामी के लिए, ढेर सारे प्यार के साथ।
        </p>
      </footer>

      {/* Music player */}
      <section className="song-section" id="song-section">
        <div className="song-card">
          <div className="vinyl-wrap">
            <div className={`vinyl ${isPlaying ? "spinning" : ""}`}>
              <div className="vinyl-label">
                <span>♡</span>
              </div>
            </div>
          </div>

          <div className="song-info">
            <p className="eyebrow">प्यार के नाम एक प्यारी धुन</p>

            <h2>
              कुछ पल
              <br />
              <span>संगीत के नाम</span>
            </h2>

            <p className="song-title">
              {songs[currentSong].title}
            </p>

            <p className="song-subtitle">
              इस प्यारे दिन को और भी यादगार बनाने
              के लिए एक खूबसूरत गीत।
            </p>

            <button
              className="primary-button song-button"
              onClick={toggleMusic}
            >
              <span>{isPlaying ? "Ⅱ" : "▶"}</span>
              {isPlaying ? "गाना रोकें" : "गाना चलाएँ"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}