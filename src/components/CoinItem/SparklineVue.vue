<template>
  <svg
    class="stroke-teal-600 fill-emerald-50"
    :width="width"
    :height="height"
    :stroke-width="stroke"
  >
    <path :d="shape" fill="none"></path>
    <path :d="[shape, fillEndPath].join(' ')" stroke="none"></path>
  </svg>
</template>

<script>
export default {
  props: {
    data: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      stroke: 2
    }
  },

  computed: {
    shape() {
      const stroke = this.stroke
      const width = this.width
      const height = this.height - stroke * 2

      const data = this.data || []

      const average = data.reduce((acc, val) => acc + val, 0) / data.length

      const normalizedData = data.map((item) => item - average)

      const highestPoint = Math.max.apply(null, normalizedData)
      const coordinates = []
      const totalPoints = this.data.length - 1

      normalizedData.forEach((item, n) => {
        const x = (n / totalPoints) * width + stroke
        const y = height / 2 - (item / highestPoint) * (height / 2) + stroke

        coordinates.push({ x, y })
      })

      if (!coordinates[0]) {
        return 'M 0 ' + this.stroke + ' L 0 ' + this.stroke + ' L ' + this.width + ' ' + this.stroke
      }

      const path = []

      coordinates.forEach((point) => path.push(['L', point.x, point.y].join(' ')))

      return ['M' + coordinates[0].x, coordinates[0].y, ...path].join(' ')
    },
    fillEndPath() {
      return `V ${this.height} L 4 ${this.height} Z`
    }
  }
}
</script>
