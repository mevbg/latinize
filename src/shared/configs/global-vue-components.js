import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const global_components = {};

export const getGlobalComponents = () => {
  const categories = {
    layouts: require.context(
      '@/shared/components/layouts',
      true,
      /[A-Z]\w+\.(vue|js)$/
    ),
    panels: require.context(
      '@/shared/components/panels',
      true,
      /[A-Z]\w+\.(vue|js)$/
    ),
    atoms: require.context(
      '@/shared/components/atoms',
      true,
      /[A-Z]\w+\.(vue|js)$/
    ),
    molecules: require.context(
      '@/shared/components/molecules',
      true,
      /[A-Z]\w+\.(vue|js)$/
    )
  };

  const register = (list) => {
    list.keys().forEach((filename) => {
      const component_config = list(filename);

      const component_name = upperFirst(
        camelCase(
          filename
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      );

      global_components[component_name] =
        component_config.default || component_config;
    });
  };

  for (const c in categories) {
    register(categories[c]);
  }

  return global_components;
};
