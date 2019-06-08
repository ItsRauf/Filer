import filer from "./src/Filer";
import FilePlugin from "./src/plugins/Files";
import ImagePlugin from "./src/plugins/Images";
import LinkPlugin from "./src/plugins/Links";

export const Filer = filer;
export const Plugins = {
  Files: FilePlugin,
  Images: ImagePlugin,
  Links: LinkPlugin
};
