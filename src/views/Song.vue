<template>
  <main>
    <!-- Music Header -->
    <section class="music-header">
      <div class="player">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="toggleAudio, newSong(song)"
          type="button"
          class="btn-player"
        >
          <i class="fas" :class="iconClass"></i>
        </button>
        <div>
          <!-- Song Info -->
          <h1 class="text-2xl font-bold">{{ song.modified_name }}</h1>
          <p>{{ song.genre }}</p>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc("song.comment_count", song.comment_count, {
              count: song.comment_count,
            })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form
            :validation-schema="schema"
            @submit="addComment"
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              {{ $t("song.button") }}
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">{{ $t("song.select_option1") }}</option>
            <option value="2">{{ $t("song.select_option2") }}</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docId"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>
        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import {
  songsCollection,
  auth,
  commentsCollection,
} from "../includes/firebase";
import { mapState, mapActions } from "pinia";
import useUSerStore from "../stores/user";
import usePlayerStore from "../stores/player";

export default {
  name: "Song",
  data() {
    return {
      song: {},
      schema: {
        comment: "required|min:3",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_message: "Please wait! Your comment is being commited",
      comments: [],
      sort: "1",
    };
  },
  computed: {
    ...mapState(useUSerStore, ["userLoggedIn"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    iconClass() {
      return this.playing ? "fa-pause" : "fa-play";
    },
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({ name: "home" });
      return;
    }

    const { sort } = this.$route.query;

    this.sort = sort === "1" || sort === "2" ? sort : "1";

    this.song = docSnapshot.data();
    this.getComments();
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong", "toggleAudio"]),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message =
        "Please wait! Your comment is being commited";

      const comment = {
        content: values.comment,
        datePosted: new Date().toLocaleTimeString("pt-BR").toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);

      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_message = "Comment added!";

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();

      this.comments = [];

      snapshots.forEach((doc) => {
        this.comments.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>

<style>
.music-header {
  background-color: #2778f2;
  color: white;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.player {
  padding: 25px;
  box-sizing: border-box;

  width: 530px;
  height: 173px;

  background: #2793f2;
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px #000000;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 25px;
}

.player h1 {
  font-size: 25px;
}

.btn-player {
  width: 90px;
  height: 90px;

  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 50%;

  color: black;
}

@media (max-width: 600px) {
  .player {
    width: 332px;
    height: 133px;

    background: #2793f2;
    border: 2px solid #000000;
    box-shadow: 3px 3px 0px #000000;
    border-radius: 10px;
  }

  .player h1 {
    font-size: 15px;
  }

  .btn-player {
    width: 60px;
    height: 60px;

    border: 2px solid #000000;
  }

  @media (max-width: 400px) {
    .music-header {
      margin: 90px auto;
    }
  }
}
</style>
