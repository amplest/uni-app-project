<script>
import { getLocation } from '@/utils/miniApp'

export default {
  onLaunch() {
    getLocation()
  }
}
</script>
<style lang="scss">
@import '/wxcomponents/vant/dist/common/index.wxss';
</style>
