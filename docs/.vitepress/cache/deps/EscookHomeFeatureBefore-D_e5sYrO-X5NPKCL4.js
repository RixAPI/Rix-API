import {
  defineComponent,
  onMounted
} from "./chunk-LIRKO5IK.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/@escook/vitepress-theme/dist/chunk/EscookHomeFeatureBefore-D_e5sYrO.js
var p = defineComponent({
  setup() {
    return onMounted(() => {
      const r = ["#f00", "#0f0", "#f0f", "#0ff", "#FE7300", "#008EFF", "red", "red", "red", "red", "red"], e = document.querySelector(".VPHomeFeatures");
      document.querySelectorAll(".VPHomeFeatures .VPFeature").forEach((t, s) => {
        t.style.setProperty("--color", r[s]), t.addEventListener("mousemove", function(o) {
          const f = o.pageX - this.offsetLeft, n = o.pageY - ((e == null ? void 0 : e.offsetTop) || 0) - this.offsetTop;
          this.style.setProperty("--x", f + "px"), this.style.setProperty("--y", n + "px");
        });
      });
    }), () => null;
  }
});
export {
  p as default
};
//# sourceMappingURL=EscookHomeFeatureBefore-D_e5sYrO-X5NPKCL4.js.map
