<template>
  <div>
    <v-row class="my-16">
      <v-col cols="12">
        <h2 class="title-text text-xl-h4 mb-10 text-center text_style">
          由 Pexels 社群分享的最佳免費圖庫影片
        </h2>
      </v-col>
    </v-row>

    <v-row class="my-10">
      <v-spacer></v-spacer>
      <v-text-field
        @keyup.enter="searchVideo"
        v-model="KeywordVideo"
        prepend-inner-icon="mdi-magnify"
        hide-details
        dense
        label="Search"
        rounded
        solo-inverted
      ></v-text-field>
      <v-btn class="mx-2" @click="searchVideo" rounded color="primary" dark>
        搜尋
      </v-btn>
      <v-spacer></v-spacer>
    </v-row>

    <v-container class="text-center">
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="item in videoList">
          <v-col :key="item.id" cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img :src="item.image" height="350px">
                  <v-card-title class="text-h6 white--text">
                    <v-row
                      class="fill-height flex-column"
                      justify="space-between"
                    >
                      <div>
                        <a target="_blank" :href="item.user.url">
                          <v-btn
                            class="my-12"
                            :color="transparent"
                            :class="{ 'show-btns': hover }"
                            x-large
                            text
                          >
                            {{ item.user.name }}
                          </v-btn>
                        </a>
                      </div>

                      <div class="align-self-center">
                        <a target="_blank" :href="item.video_files[0].link">
                          <v-btn
                            :class="{ 'show-btns': hover }"
                            :color="transparent"
                            icon
                            x-large
                          >
                            <v-icon
                              x-large
                              :class="{ 'show-btns': hover }"
                              :color="transparent"
                            >
                              mdi-play
                            </v-icon>
                          </v-btn>
                        </a>
                      </div>
                    </v-row>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>

      <hr class="my-10" />

      <v-row class="justify-space-around my-10">
        <div class="text-center mb-10">
          <v-btn @click="videoMore" rounded color="primary" dark> 更多 </v-btn>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
    videoList: [],
    transparent: "rgb(0 0 0 / 58%)",
    PageNumVideo: 9,
    SearcNumhVideo: 9,
    KeywordVideo: "",
  }),

  methods: {
    FeaturedVideo: function () {
      const vm = this;
      let API = `https://api.pexels.com/videos/popular?per_page=${vm.PageNumVideo}`;
      fetch(API, {
        methods: "GET",
        headers: {
          Authorization: process.env.VUE_APP_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.videos);
          vm.videoList = data.videos;
        });
    },

    searchVideo: function () {
      const vm = this;
      let API = `https://api.pexels.com/videos/search?query=${vm.KeywordVideo}&per_page=${vm.SearcNumhVideo}`;

      fetch(API, {
        methods: "GET",
        headers: {
          Authorization: process.env.VUE_APP_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((videodata) => {
          vm.videoList = videodata.videos;
        });
    },

    videoMore: function () {
      const vm = this;
      if (vm.KeywordVideo == "") {
        vm.PageNumVideo += 9;
      } else {
        vm.SearcNumhVideo += 9;
      }
    },
  },

  created() {
    this.FeaturedVideo();
  },

  watch: {
    PageNumVideo: function () {
      this.FeaturedVideo();
    },
    SearcNumhVideo: function () {
      this.searchVideo();
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
p {
  color: rgb(0 0 0 / 60%);
  padding: 1rem;
}
h2 {
  color: rgba(0, 0, 0, 0.6);
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);
  letter-spacing: 5px;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: white !important;
}
hr {
  width: 30%;
  background-color: #c1c1c159;
  height: 5px;
  border: 0px;
  margin: 0 auto;
}

@media screen and (max-width: 600px) {
  .title-text {
    font-size: 16px;
    white-space: pre-wrap;
  }
}
</style>