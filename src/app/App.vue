<template>
  <HeaderBar />

  <main :class="$style.body">
    <LayoutDuo>
      <template v-slot:input>
        <textarea
          :class="$style.input"
          id="input"
          autocorrect="off"
          spellcheck="false"
          name="input"
          :autofocus="!first_visit"
          :placeholder="'Въведете текст за латинизиране тук.'"
          v-model="text"
        />
      </template>

      <template v-slot:output>
        <Output :class="$style.output" :content="markup_output">
          <template v-if="markup_output.length">
            <transition name="fade" mode="out-in">
              <button
                v-if="!copied"
                :key="1"
                :class="$style.copyButton"
                @click="handleCopyButtonClick"
              >
                Копирай в клипборда
              </button>
              <button
                v-else
                :key="2"
                :class="[$style.copyButton, $style.copied]"
              >
                ✅ Копирано
              </button>
            </transition>
          </template>
        </Output>
      </template>
    </LayoutDuo>
  </main>

  <!-- <FooterBar /> -->
</template>

<script>
import HeaderBar from '@/shared/components/organisms/HeaderBar';
// import FooterBar from '@/shared/components/organisms/FooterBar';
import latinizerMixin from '@/shared/latinizer.js';

export default {
  components: {
    HeaderBar
    // FooterBar
  },

  mixins: [latinizerMixin],

  data() {
    return {
      first_visit: !localStorage.latinizeMe_token,
      text: '',
      copied: false
    };
  },

  async created() {
    try {
      const clipText = await navigator.clipboard.readText();

      if (!this.textHasCyrillicSymbols(clipText)) {
        throw new Error('В този текст няма кирилица.');
      }

      this.text = clipText;
    } catch (e) {
      console.log({ e });
    }
  },

  methods: {
    textHasCyrillicSymbols(text) {
      return /[а-яА-ЯЁё]/.test(text);
    },

    copyToClipboard() {
      if (this.output) {
        try {
          navigator.clipboard.writeText(this.output);
        } catch (e) {
          console.error(e);
        }
      }
    },

    handleCopyButtonClick() {
      this.copyToClipboard();

      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" module>
.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100vh - 16rem);
}

.input {
  @include padding-h(map-get($role-layout-x-gutters, 'level1'));
  @include padding-v(map-get($role-layout-y-gutters, 'level1'));

  display: block;
  width: 100%;
  min-height: map-get($role-dimensions-min, 'block');
  line-height: var(--typo-line-height-base);
  color: var(--color-text-base);
  background-color: var(--color-background-input);
  border-radius: map-get($role-borders-radiuses, 'block');
  box-shadow: inset 0 3px 6px 0
    rgba(map-get($swatches-colors-mono, 'black'), 0.3);
}

.output {
  padding-bottom: calc(var(--layout-grid-gutter) * 3) !important;
}

.copy-button {
  $offset: map-get($role-layout-y-gutters, 'level1');

  @include padding-h(map-get($role-layout-x-gutters, 'level2'));
  @include padding-v(map-get($role-layout-y-gutters, 'level2'));

  position: absolute;
  right: $offset;
  bottom: map-get($role-layout-y-gutters, 'level2');
  left: $offset;
  font-size: 0.9em;
  color: var(--color-text-base);
  background-color: map-get($swatches-colors-brand, 'light');
  border-radius: map-get($role-borders-radiuses, 'block');

  &.copied {
    color: var(--color-text-negative);
    pointer-events: none;
    background-color: map-get($swatches-colors-derivatives, 'lighter');
  }
}

:global {
  .fade-enter-active,
  .fade-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-leave-to,
  .fade-enter {
    opacity: 0;
  }
}
</style>
<style
  src="@/shared/styles/utilities/wrappers.scss"
  module="$wrappers"
  lang="scss"
/>
