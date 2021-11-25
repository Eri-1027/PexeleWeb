<template>
  <v-container>
    <v-row justify="center" class="my-16">
      <v-img
        src="~@/assets/image/404.png"
        lazy-src="~@/assets/image/404.png"
        max-width="500"
        max-height="500"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
</style>