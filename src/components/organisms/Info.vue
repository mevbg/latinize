<template>
  <details ref="details" :open="opened" :class="$style.root">
    <summary :class="$style.icon">i</summary>

    <div :class="$style.curtain">
      <Output :class="$style.panel" :content="markup_output">
        <br />
        <button @click="handleInfoButtonClick">OK</button>
      </Output>
    </div>
  </details>
</template>

<script>
import info_content from '@/content/info.js';
import latinizerMixin from '@/latinizer.js';

export default {
  mixins: [latinizerMixin],

  data() {
    return {
      text: info_content,
      first_visit: false
    };
  },

  computed: {
    opened() {
      return this.first_visit;
    }
  },

  created() {
    this.first_visit = !localStorage.latinizeMe_token;
  },

  methods: {
    handleInfoButtonClick() {
      this.$refs.details.removeAttribute('open');
      this.setToken();
      document.querySelector('#input').focus();
    },

    setToken() {
      localStorage.latinizeMe_token = Date.now();
    }
  }
};
</script>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
}

.icon {
  @include dimensions-square(map-get($role-dimensions, 'info-icon'));

  font-weight: 700;
  line-height: map-get($role-dimensions, 'info-icon');
  color: var(--color-text-negative-highlight);
  text-align: center;
  list-style: none;
  cursor: pointer;
  user-select: none;
  background-color: var(--color-icons-info);
  border-radius: 50%;

  &::-webkit-details-marker {
    display: none;
    list-style: none;
  }
}

.curtain {
  @media screen and (max-width: #{map-get($role-layout-content-breakpoints, 'columns') - 1}) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(4px);
  }
}

.panel {
  position: absolute !important;
  z-index: 1;
  max-width: 520px;
  min-height: auto !important;
  text-indent: 4rem;
  background-color: map-get($swatches-colors-derivatives, 'lighter') !important;
  box-shadow: 0px 0px 20px -8px map-get($swatches-colors-mono, 'black');
  transform: translateY(map-get($role-layout-y-gutters, 'level1'));

  @media screen and (max-width: #{map-get($role-layout-content-breakpoints, 'columns') - 1}) {
    @include margin-h(calc(var(--layout-outer-x-gutter) / 2));

    top: 25vh;
    left: calc(50% - (var(--layout-outer-x-gutter) / 2));
    width: calc(100% - var(--layout-outer-x-gutter));
    transform: translateX(-50%);
  }

  @media screen and (min-width: #{map-get($role-layout-content-breakpoints, 'columns')}) {
    top: 0;
    right: calc(var(--layout-outer-x-gutter) * 2);
    margin-left: calc(var(--layout-outer-x-gutter) / 2);
  }

  button {
    @include padding-h(map-get($role-layout-x-gutters, 'level1'));
    @include padding-v(map-get($role-layout-y-gutters, 'level2'));

    color: var(--color-text-negative);
    background-color: var(--color-background-button);
    border-radius: map-get($role-borders-radiuses, 'block');
  }
}
</style>
<style
  src="@/styles/utilities/wrappers.scss"
  module="$wrappers"
  lang="scss"
></style>
<style
  src="@/styles/utilities/backgrounds.scss"
  module="$backgrounds"
  lang="scss"
></style>
