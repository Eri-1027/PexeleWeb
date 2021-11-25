<template>
  <div>
    <v-row class="my-16">
      <v-col cols="12">
        <h2 class="title-text mb-10 text-center text_style">
          才華洋溢創作者分享的最佳免費圖庫相片和影片
        </h2>
      </v-col>

      <v-row class="my-10">
        <v-spacer></v-spacer>
        <v-text-field
          @keyup.enter="search"
          v-model="Keyword"
          prepend-inner-icon="mdi-magnify"
          hide-details
          dense
          label="Search"
          rounded
          solo-inverted
        ></v-text-field>
        <v-btn class="mx-2" @click="search" rounded color="primary" dark>
          搜尋
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-row>

    <v-row class="my-16 px-5 justify-space-around">
      <v-card
        max-width="350"
        elevation="10"
        v-for="item in PhotosData"
        :key="item.id"
        class="card_style rounded-xl mx-1 my-10"
      >
        <a :href="item.src.original" target="_blank">
          <v-img
            class="rounded-xl"
            max-width="350"
            :lazy-src="item.src.large"
            :src="item.src.large"
            height="300px"
          >
          </v-img>
        </a>

        <v-card-actions>
          <a
            :href="item.photographer_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-btn class="rounded-xl" color="primary" text>
              {{ item.photographer }}
            </v-btn>
          </a>
        </v-card-actions>

        <v-col>
          <v-menu transition="slide-x-transition" top offset-x z-index="1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="rounded-xl"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                圖片大小
              </v-btn>
            </template>

            <v-list>
              <v-list-item-group color="primary">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.src.original" target="_blank">original</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.src.large2x" target="_blank">large2x</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.src.large" target="_blank">large</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.src.medium" target="_blank">medium</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <a :href="item.src.small" target="_blank">small</a>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-card>
    </v-row>

    <hr class="my-10" />

    <div class="text-center mb-10">
      <v-btn @click="More" rounded color="primary" dark> 更多 </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    collapseOnScroll: true,
    PhotosData: [],
    dialog: false,
    pageNum: 24,
    search_pageNum: 24,
    Keyword: "",
  }),

  methods: {
    Featured() {
      const vm = this;
      let API = `https://api.pexels.com/v1/curated?per_page=${vm.pageNum}`;

      fetch(API, {
        methods: "GIT",
        headers: {
          Authorization: process.env.VUE_APP_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          vm.PhotosData = data.photos;
          console.log();
        });
    },

    search() {
      const vm = this;
      let Keyword = vm.Keyword;
      let API = `https://api.pexels.com/v1/search?query=${Keyword}&per_page=${vm.search_pageNum}`;

      fetch(API, {
        methods: "GIT",
        headers: {
          Authorization: process.env.VUE_APP_KEY,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((search_data) => {
          console.log(search_data);
          vm.PhotosData = search_data.photos;
        });
    },

    More: function () {
      const vm = this;
      if (vm.Keyword == "") {
        vm.pageNum += 4;
      } else {
        vm.search_pageNum += 4;
      }
    },
  },
  created() {
    this.Featured();
  },

  watch: {
    pageNum: function () {
      this.Featured();
    },
    search_pageNum: function () {
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 15px;
}
h2 {
  color: rgba(0, 0, 0, 0.6);
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -5px 35px rgba(255, 255, 255, 0.3);
  letter-spacing: 5px;
}
hr {
  width: 30%;
  background-color: #c1c1c159;
  height: 5px;
  border: 0px;
  margin: 0 auto;
}
a {
  text-decoration: none;
  display: block;
}
a:hover {
  transform: scale(0.9);
  transition: all 0.8s;
}

@media screen and (max-width: 600px) {
  .title-text {
    font-size: 16px;
    white-space: pre-wrap;
  }
}
</style>