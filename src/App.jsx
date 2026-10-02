import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const START_DATE = new Date("2026-08-06T15:12:00");

/* CONTENTS */


const chapters = [
  {
    date: "August 1, 2026",
    title: "The day we first met",
    text: "We met in a Roblox game. At the time, I had absolutely no idea that meeting you would eventually lead to this.",
    photos: [
      {
        src: asset("/memories/gakuran.png"),
        caption: "Where we met",
        date: "Roblox - Gakuran",
      },
    ],
  },
  {
    date: "AUGUST 1, 2026",
    title: "The first message",
    text: "The same day we met, I asked for your discord, and of course, I immediately sent you a message after you accepted my friend request.",
    photos: [
      {
        src: asset("/memories/first-message.png"),
        caption: "Our first discord convo",
        date: "August 1, 2026",
      },
      {
        src: asset("/memories/first-message2.png"),
        caption: "Our first discord convo",
        date: "August 1-2, 2026"
      }
    ],
  },
  {
    date: "AUGUST 6, 2026",
    title: "Just friends... at first.",
    text: "This was when we really started talking. You used to tease me with fake details about yourself. I was gullible enough to believe them most of the time, but eventually, I just got used to it. We played Sniper Arena and Bomb Chip. Nothing too flirty. Nothing complicated. We were just friends... or at least, that's what I thought.",
    photos: [
      {
        src: asset("/memories/SniperArena1.png"),
        caption: "Our first discord call - we played Sniper Arena :> tapos I beat ya ass so gihanggat tkag pautokay",
        date: "August 6, 2026",
      },
      {
        src: asset("/memories/gulliblenomo.png"),
        caption: "You always fooled me on gakuran so I just started doubting u by this time T__T",
        date: "August 8, 2026",
      },
      {
        src: asset("/memories/SniperArena2.png"),
        caption: "we continued playing Sniper Arena, we were very competitive ani na time",
        date: "August 9, 2026",
      }
    ],
  },
  {
    date: "SOMEWHERE ALONG THE WAY",
    title: "Somehow, every day.",
    text: "One conversation became another, and eventually talking to you became part of my everyday life.",
    photos: [
      {
        src: asset("/memories/everyday1aug10.png"),
        caption: "I started getting really comfortable here, even started playing inappropriate songs near you T__T",
        date: "August 10, 2026",
      },
      {
        src: asset("/memories/everydayDriveABus.png"),
        caption: "I started getting really comfortable here, even started playing inappropriate songs near you T__T",
        date: "August 14, 2026",
      },
      {
        src: asset("/memories/everydayLoveaug15.png"),
        caption: "until we eventuallly started calling each other 'love' on dms",
        date: "August 15, 2026",
      },
      {
        src: asset("/memories/everydayCall2Wake.png"),
        caption: "hehe",
        date: "August 23, 2026",
      },
      {
        src: asset("/memories/everydayFirstphoto.png"),
        caption: "the very first photo you sent me na I only got a glimpse of, grrr la jd na save",
        date: "August 23, 2026",
      },
      {
        src: asset("/memories/everydayGuessedyourLoc.png"),
        caption: "HAWHWAHAHA natag anan najd diay unta nako taga aha ka ba",
        date: "August 23, 2026",
      },
      {
        src: asset("/memories/everydayPossessive.png"),
        caption: "possessive yarn?",
        date: "August 24, 2026",
      },
      {
        src: asset("/memories/everydayCDP1.png"),
        caption: "bro is really trying to get that cdp fam T__T",
        date: "August 25, 2026",
      },
      {
        src: asset("/memories/everydayCDP2.png"),
        caption: "INULTIHAN",
        date: "August 26, 2026",
      },
      {
        src: asset("/memories/everydayCDP3.png"),
        caption: "DIDN'T HAVE A SCREENSHOT SA FIRST CDP SOOO T__T DUNNO WHERE IT WENT OMG",
        date: "October 2, 2026",
      },
    ],
  },
];

const memories = [
  {
    title: "You lost my gift in Minecraft.",
    label: "01 — THE MOMENT I FELL HARD",
    description:
      "Somewhere between you panicking in my DMs and me trying to calm you down, I saw how much you care about my feelings and how much you care about the things I gave you, even though they're just in-game. That was the exact moment I really, really fell for you.",
    photos: [
      asset("/memories/mclost1.png"),
      asset("/memories/mclost2.png"),
      asset("/memories/mclost3.png"),
    ],
  },
  {
    title: "The slayers 2 parkour & The Notebook.",
    label: "02 — TOO MANY TEARS",
    description:
      "First, you cried over slayers parkour. Then a few hours later, we watched The Notebook and it made you cry again. And somehow, I loved you a little more each time.",
    photos: [
      asset("/memories/slayers2.png"),
      asset("/memories/slayers2ava.png"),
      asset("/memories/theNotebook.png"),
      asset("/memories/crybaby.png"),
      asset("/memories/crybaby2.png"),
    ],
  },
  {
    title: "All the little moments.",
    label: "03 — THE MOMENTS WE SHARE",
    description:
      "The time we spent with each other in-game, how competitive we are, and all those little moments I somehow ended up saving screenshots of...",
    photos: [
      asset("/memories/memories1.png"),
      asset("/memories/memories2.png"),
      asset("/memories/memories3.png"),
      asset("/memories/memories4.png"),
      asset("/memories/memories5.png"),
      asset("/memories/memories6.png"),
      asset("/memories/memories7.png"),
      asset("/memories/memories8.png"),
      asset("/memories/memories9.png"),
      asset("/memories/memories10.png"),
      asset("/memories/memories11.png"),
      asset("/memories/memories12.png"),
      asset("/memories/memories13.png"),
      asset("/memories/memories14.png"),
      asset("/memories/memories15.png"),
      asset("/memories/memories16.png"),
      asset("/memories/memories17.png"),
      asset("/memories/memories18.png"),
      asset("/memories/memories19.png"),
      asset("/memories/memories20.png"),
    ],
  },
];

const noLabels = [
  "NO 😭",
  "Are you sure? 🥺",
  "Think again 💔",
  "Really?? 😢",
  "Please? 🥹",
];


const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(threshold = 0.5) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}

/* typewrite setting */
function Typewriter({
  text,
  as: Tag = "p",
  className,
  speed = 38,
  delay = 0,
}) {
  const [ref, seen] = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!seen) return;

    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }

    let i = 0;
    let interval;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [seen, text, speed, delay]);

  const typing = seen && count < text.length;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {typing && <span className="caret" />}
        <span className="tw-rest">{text.slice(count)}</span>
      </span>
    </Tag>
  );
}

/* LIGHTBOX (tap a photo to view it big and zoom in) */

function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(null); // {x, y} in percent, or null
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const onCloseRef = useRef(onClose);
  const total = images.length;

  onCloseRef.current = onClose;

  const go = useCallback(
    (direction) => {
      setZoom(null);
      setIndex((i) => (i + direction + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft" && total > 1) go(-1);
      if (e.key === "ArrowRight" && total > 1) go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, total]);

  const pointInFrame = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null || zoom) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (total > 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  // React events bubble through portals, so keep them away from the carousel underneath
  const stop = (e) => e.stopPropagation();

  const current = images[index];

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onKeyDown={stop}
      onTouchStart={(e) => {
        e.stopPropagation();
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        handleTouchEnd(e);
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close photo"
      >
        ✕
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </>
      )}

      <div
        className={zoom ? "lightbox-frame zoomed" : "lightbox-frame"}
        onClick={(e) => {
          e.stopPropagation();
          setZoom(zoom ? null : pointInFrame(e));
        }}
        onPointerMove={(e) => zoom && setZoom(pointInFrame(e))}
      >
        <img
          src={current.src}
          alt={current.alt || ""}
          draggable={false}
          style={{
            transform: zoom ? "scale(2.4)" : "none",
            transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
          }}
        />
      </div>

      <p className="lightbox-info" onClick={stop}>
        {current.caption && <span>{current.caption}</span>}
        {total > 1 && (
          <span>
            {index + 1} / {total}
          </span>
        )}
        {!zoom && <span>Tap/click to zoom</span>}
      </p>
    </div>,
    document.body
  );
}

/* polaroid */
function PhotoSlot({ src, caption, date, onZoom }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="photo-slot">
      {src && !failed ? (
        <button
          type="button"
          className="zoom-trigger"
          onClick={onZoom}
          aria-label={`Zoom in: ${caption}`}
        >
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        </button>
      ) : (
        <div className="photo-empty">
          <span className="photo-icon">📸</span>
          <p>{caption}</p>
        </div>
      )}
      <figcaption>{date}</figcaption>
    </figure>
  );
}

function ChapterPhotos({ photos }) {
  const [zoomIndex, setZoomIndex] = useState(null);

  return (
    <>
      <div className={photos.length > 1 ? "photo-gallery" : "photo-single"}>
        {photos.map((photo, i) => (
          <PhotoSlot
            key={photo.src}
            src={photo.src}
            caption={photo.caption}
            date={photo.date}
            onZoom={() => setZoomIndex(i)}
          />
        ))}
      </div>

      {zoomIndex !== null && (
        <Lightbox
          images={photos.map((p) => ({
            src: p.src,
            alt: p.caption,
            caption: p.caption,
          }))}
          startIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </>
  );
}


/* CAROUSEL */


function Carousel({ photos, title }) {
  const [index, setIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(null);
  const touchStart = useRef(null);
  const total = photos.length;

  const go = useCallback(
    (direction) => setIndex((i) => (i + direction + total) % total),
    [total]
  );

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div
      className="carousel"
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label={title}
      onKeyDown={handleKey}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {photos.map((src, i) => (
          <div className="carousel-slide" key={src} aria-hidden={i !== index}>
            <img className="slide-bg" src={src} alt="" />
            <button
              type="button"
              className="slide-zoom"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setZoomIndex(i)}
              aria-label={`Zoom in on photo ${i + 1} of ${total}`}
            >
              <img
                className="slide-img"
                src={src}
                alt={`${title} (${i + 1} of ${total})`}
                loading="lazy"
              />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel-arrow prev"
        onClick={() => go(-1)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <button
        type="button"
        className="carousel-arrow next"
        onClick={() => go(1)}
        aria-label="Next photo"
      >
        ›
      </button>

      <span className="carousel-count">
        {index + 1} / {total}
      </span>

      <div className="carousel-dots">
        {photos.map((src, i) => (
          <button
            type="button"
            key={src}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>

      {zoomIndex !== null && (
        <Lightbox
          images={photos.map((src) => ({ src, alt: title }))}
          startIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </div>
  );
}

/* PROPOSAL*/


function Proposal({ onYes }) {
  const [pos, setPos] = useState(null);
  const [dodges, setDodges] = useState(0);
  const noRef = useRef(null);
  const yesRef = useRef(null);

  const dodge = () => {
    const no = noRef.current;
    const yes = yesRef.current;
    if (!no || !yes) return;

    const w = no.offsetWidth;
    const h = no.offsetHeight;
    const pad = 16;
    const yesBox = yes.getBoundingClientRect();

    let next = null;

    // Try a few random spots that stay on screen and avoid the YES button.
    for (let i = 0; i < 12; i += 1) {
      const left = pad + Math.random() * (window.innerWidth - w - pad * 2);
      const top = pad + Math.random() * (window.innerHeight - h - pad * 2);

      const overlapsYes =
        left < yesBox.right + 20 &&
        left + w > yesBox.left - 20 &&
        top < yesBox.bottom + 20 &&
        top + h > yesBox.top - 20;

      next = { left, top };
      if (!overlapsYes) break;
    }

    setPos(next);
    setDodges((d) => d + 1);
  };

  const noStyle = pos
    ? { position: "fixed", left: pos.left, top: pos.top }
    : undefined;

  return (
    <section className="proposal">
      <p className="section-label">ONE LAST THING</p>

      <Typewriter
        as="h2"
        text="Looking back at all of this..."
        speed={55}
      />

      <Typewriter
        className="proposal-text"
        text="I think I finally understand why I always wanted one more game, one more conversation, and one more night with you."
        speed={32}
        delay={1800}
      />

      <h1 className="ask">Will you be my girlfriend?</h1>

      <div className="buttons">
        <button
          ref={yesRef}
          type="button"
          className="yes-button"
          style={{ "--grow": 1 + Math.min(dodges, 6) * 0.07 }}
          onClick={onYes}
        >
          YES ❤️
        </button>

        <div className="no-slot">
          <button
            ref={noRef}
            type="button"
            className="no-button"
            style={noStyle}
            onPointerEnter={dodge}
            onFocus={dodge}
            onClick={dodge}
          >
            {noLabels[dodges % noLabels.length]}
          </button>
        </div>
      </div>
    </section>
  );
}

/* YES PAGE   */

function YesPage() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 22,
        duration: 9 + Math.random() * 8,
        delay: -Math.random() * 14,
      })),
    []
  );

  // Clicking YES counts as a user gesture for autoplay.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.7;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="yes-page">
      <div className="hearts" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <div className="yes-content">
        <p className="small-text">SHE SAID YES</p>

        <Typewriter
          as="h1"
          className="yes-title"
          text="You just made me the happiest person alive."
          speed={55}
        />

        {/* short message */}
        <div className="player">
          <button
            type="button"
            className={playing ? "disc spinning" : "disc"}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <div className="player-info">
            <strong>Short message</strong>
            <span>for MY GIRLFRIEND RAAAHHH 😝😝😝</span>
          </div>

          <audio
            ref={audioRef}
            src={asset("voicemessage/message.mp3")}
            loop
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>

        <a className="back-link" href="#/">
          Read our story again
        </a>
      </div>
    </main>
  );
}


/* APP */

const getPage = () => (window.location.hash === "#/yes" ? "yes" : "home");

function App() {
  const [page, setPage] = useState(getPage);
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Tiny hash router so "Yes" gets its own page without extra dependencies.
  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const updateTimer = () => {
      const seconds = Math.max(
        0,
        Math.floor((new Date() - START_DATE) / 1000)
      );

      setTimeTogether({
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  if (page === "yes") return <YesPage />;

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <Typewriter
            className="small-text"
            text="Hello, love..."
            speed={70}
          />

          <Typewriter
            as="h1"
            text="There's something I've been meaning to tell you."
            speed={45}
            delay={1100}
          />

          <Typewriter
            className="typewriter"
            text="So maybe you should stay for a little while..."
            speed={40}
            delay={3600}
          />

          <a href="#story" className="scroll-button" aria-label="Scroll down">
            ↓
          </a>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="section">
        <p className="section-label">OUR LITTLE STORY</p>

        <Typewriter as="h2" text="Where it all started" speed={55} />

        <div className="timeline">
          {chapters.map((chapter) => (
            <div className="timeline-item" key={chapter.title}>
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <span className="timeline-date">{chapter.date}</span>

                <Typewriter as="h3" text={chapter.title} speed={50} />

                <Typewriter text={chapter.text} speed={26} delay={600} />

                <ChapterPhotos photos={chapter.photos} />
              </div>
            </div>
          ))}
        </div>

        {/* TIMER */}
        <div className="timer-card">
          <p>We've been talking for...</p>

          <div className="timer">
            <div>
              <strong>{timeTogether.days}</strong>
              <span>days</span>
            </div>
            <div>
              <strong>{String(timeTogether.hours).padStart(2, "0")}</strong>
              <span>hours</span>
            </div>
            <div>
              <strong>{String(timeTogether.minutes).padStart(2, "0")}</strong>
              <span>minutes</span>
            </div>
            <div>
              <strong>{String(timeTogether.seconds).padStart(2, "0")}</strong>
              <span>seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* MEMORIES */}
      <section className="section memories">
        <p className="section-label">A FEW MEMORIES</p>

        <Typewriter as="h2" text="Moments I'll always remember" speed={50} />

        <div className="memory-grid">
          {memories.map((memory) => (
            <article className="memory-card" key={memory.label}>
              <Carousel photos={memory.photos} title={memory.title} />

              <div className="memory-content">
                <span className="memory-label">{memory.label}</span>

                <Typewriter as="h3" text={memory.title} speed={50} />

                <Typewriter
                  text={memory.description}
                  speed={24}
                  delay={500}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROPOSAL */}
      <Proposal onYes={() => (window.location.hash = "#/yes")} />
    </main>
  );
}

export default App;