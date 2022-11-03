<template>
  <DarkPanel :class="[$style.root, $backgrounds.dark]">
    <div v-if="has_content">
      <template v-for="chunk in content" :key="chunk.key">
        <span
          v-html="chunk.text"
          :class="{ [this.$style.active]: chunk.match }"
        />
      </template>
    </div>
    <div v-else :class="$style.placeholder">
      Латинизираният текст ще се появи тук.
    </div>

    <div :style="{ textAlign: 'center' }">
      <slot />
    </div>
  </DarkPanel>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },

  computed: {
    has_content() {
      return Object.keys(this.content).length;
    }
  }
};
</script>

<style lang="scss" module>
.root {
  position: relative;
}

.active {
  color: map-get($swatches-colors-brand, 'light');
}

.placeholder {
  @include padding-h(map-get($role-layout-x-gutters, 'level1'));
  @include padding-v(map-get($role-layout-y-gutters, 'level1'));

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(3rem, 7vw, 5rem);
  text-align: center;
  user-select: none;
  opacity: 0.2;
}
</style>
<style
  src="@/shared/styles/utilities/backgrounds.scss"
  module="$backgrounds"
  lang="scss"
></style>
