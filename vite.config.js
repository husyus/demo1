import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ElectronDevPlugin } from "./plugins/vite.electron.dev";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElectronDevPlugin(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon", //这个注释掉没有影响
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"],
          prefix: "Icon", //图标组件的前缀，没有这个配置无法正确导入组件
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: "vue3",
      iconCustomizer: (collection, icon, props) => {
        props.width = "1em";
        props.height = "1em";
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
