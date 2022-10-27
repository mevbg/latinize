import highlightWords from 'highlight-words';
import { LOOKALIKE_GRAPHEMES, LATIN_LOOKALIKE_GRAPHEMES } from '@/constants';

export default {
  computed: {
    output() {
      return this.latinize(this.text);
    },

    markup_output() {
      return this.markUpLatinizedText(this.output);
    }
  },

  methods: {
    latinize(text) {
      return text.replace(/[\wа-я]/g, (g) => LOOKALIKE_GRAPHEMES[g] || g);
    },

    markUpLatinizedText(latinized_text) {
      return highlightWords({
        text: latinized_text.replace(/\n\r?/g, '<br />'),
        query: `/(${LATIN_LOOKALIKE_GRAPHEMES.join('|')})/`
      });
    }
  }
};
