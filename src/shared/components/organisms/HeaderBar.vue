<template>
  <header :class="$style.root">
    <Logo :class="$style.logo" />
    <Info :class="$style.info" />
  </header>
</template>

<script>
import color_schemes_constants from '@/shared/configs/color-schemes';
const color_schemes = color_schemes_constants['color-schemes'];
import Logo from '@/shared/assets/logo.svg';
import Info from '@/shared/components/organisms/Info';

export default {
  components: {
    Logo,
    Info
  },

  data() {
    return {
      color_schemes_on: color_schemes.toggle
    };
  }
};
</script>

<style lang="scss" module>
.root {
  @include padding-v(map-get($role-layout-y-gutters, 'level1'));

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-negative);
}

.logo {
  position: relative;
  z-index: 2;
  width: map-get($role-dimensions, 'logo');

  :global {
    .c1 {
      fill: map-get($swatches-colors-derivatives, 'lightest');
    }

    .c2 {
      fill: map-get($swatches-colors-mono, 'white');
    }

    .c3 {
      fill: map-get($swatches-colors-brand, 'light');
    }

    .c4 {
      fill: map-get($swatches-colors-brand, 'dark');
    }
  }
}

.info {
  margin-right: var(--layout-outer-x-gutter);
}
</style>
