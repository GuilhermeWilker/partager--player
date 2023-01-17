<template>
  <div>
    <main>
      <section class="hero">
        <div class="hero-info">
          <h1>Ouça boas &nbsp; <span class="marker">musicas!</span></h1>
          <p>
            Publique suas músicas, faça novos amigos e descubra novos artistas.
          </p>
          <p>
            Esqueça os players de música chatos e formais, é hora de se divertir
            com nosso player de música incrível!!
          </p>
        </div>
        <img class="" src="assets/img/char-home.png" />
      </section>
    </main>
    <section class="music-box">
      <div class="container-music">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon.right.indigo="'headphones-alt'"
        >
          <span class="card-title">{{ $t("home.song") }}</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <AppSongItem v-for="song in songs" :key="song.docId" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </div>
</template>

<script>
import { songsCollection } from "../includes/firebase";
import AppSongItem from "../components/SongItem.vue";

export default {
  name: "Home",
  components: {
    AppSongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 15,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;

      if (this.songs.length) {
        const lastDoc = songsCollection
          .doc(this.songs[this.songs.length - 1].docId)
          .get();

        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docId: document.id,
          ...document.data(),
        });
      });
      this.pendingRequest = false;
    },
  },
};
</script>

<style scoped>
main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2778f2;
}

.hero {
  position: relative;
  width: 874px;
  height: 450px;
}

.hero-info {
  position: relative;
  color: white;
  width: 623px;

  margin-top: 100px;
  z-index: 7;
}

.hero-info h1 {
  font-weight: 700;
  font-size: 48px;

  display: flex;
  align-items: center;
}

.hero-info h1 .marker {
  padding: 0 8px;
  align-self: center;
  background: #d93b92;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
  border-radius: 5px;
}

.hero-info p {
  font-weight: 600;
  font-size: 18px;

  padding-top: 8px;
}

.hero img {
  position: relative;
  bottom: 213px;
  left: 500px;

  z-index: 1;
}

.music-box {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-music {
  /*bg-white rounded border border-gray-200 relative flex flex-col*/

  background-color: white;
  border: 1px solid rgb(230, 230, 230);
  width: 1000px;
}
</style>
