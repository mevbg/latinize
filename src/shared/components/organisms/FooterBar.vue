<template>
  <footer :class="$style.root">
    <div :class="$wrappers.wrpLayout">•</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  font-size: 4rem;
  color: var(--color-background-footer);
  text-align: center;
  user-select: none;
}
</style>
<style
  src="@/shared/styles/utilities/wrappers.scss"
  module="$wrappers"
  lang="scss"
></style>
