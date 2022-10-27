<template>
  <section :class="$style.panel">
    <slot />
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.panel {
  @include padding-h(map-get($role-layout-x-gutters, 'level1'));
  @include padding-v(map-get($role-layout-y-gutters, 'level1'));

  min-height: map-get($role-dimensions-min, 'block');
  color: var(--color-text-negative);
  background-color: var(--color-background-dark-panel);
  border-radius: map-get($role-borders-radiuses, 'block');
}
</style>
