<template>
  <div :class="[$wrappers.wrpLayout, $style.duoLayout]">
    <div>
      <slot name="input" />
    </div>

    <div>
      <slot name="output" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.duo-layout {
  display: flex;
  flex: 1;
  padding-top: map-get($role-layout-outer-y-gutters, 'top');
  padding-bottom: map-get($role-layout-outer-y-gutters, 'bottom');

  > * {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  @media screen and (max-width: #{map-get($role-layout-gutters-breakpoints, 's') - 1}) {
    --layout-grid-gutter: #{map-get($role-layout-grid-gutter, 's')};
  }

  @media screen and (min-width: #{map-get($role-layout-gutters-breakpoints, 's')}) and (max-width: #{map-get($role-layout-gutters-breakpoints, 'm') - 1}) {
    --layout-grid-gutter: #{map-get($role-layout-grid-gutter, 'm')};
  }

  @media screen and (min-width: #{map-get($role-layout-gutters-breakpoints, 'm')}) {
    --layout-grid-gutter: #{map-get($role-layout-grid-gutter, 'l')};
  }

  @media screen and (max-width: #{map-get($role-layout-content-breakpoints, 'columns') - 1}) {
    flex-direction: column;

    > * + * {
      margin-top: var(--layout-grid-gutter);
    }
  }

  @media screen and (min-width: #{map-get($role-layout-content-breakpoints, 'columns')}) {
    > * + * {
      margin-left: var(--layout-grid-gutter);
    }
  }

  > * > * {
    flex: 1;
  }

  > * > * + * {
    margin-top: var(--layout-grid-gutter);
  }

  main {
    //
  }

  aside {
    //
  }
}
</style>
<style src="@/styles/utilities/wrappers.scss" module="$wrappers" lang="scss" />
