<script lang="ts">
  import { chart } from "svelte-apexcharts";
  import day from "dayjs";
  import customFormat from "dayjs/plugin/customParseFormat";
  import { generate, long } from "../libs/shortNumber";
  import "dayjs/locale/es";

  import { storeTypeChart } from "../stores/storeTypeChart";
  import { storeDepChart } from "../stores/storeDepChart";
  import { storeDarkMode } from "../stores/storeDarkMode";

  import { generateDataChart, convertDataChart } from "../libs/dataChart";

  import type { IOptChart } from "../models/modelChartOpt";

  day.extend(customFormat);

  export let cls: string = "";

  let dataInicial: IOptChart = generateDataChart();
  let type = 1;
  let dep = "TOTAL";

  let options = {
    chart: {
      foreColor: $storeDarkMode ? "#fafafa" : "#474747",
      defaultLocale: "es",
      locales: [
        {
          name: "es",
          options: {
            months: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ],
            shortMonths: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ],
            days: [
              "Domingo",
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
            ],
            shortDays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            toolbar: {
              download: "Descargar SVG",
              selection: "Seleccionar",
              selectionZoom: "Seleccionar Zoom",
              zoomIn: "Acercar",
              zoomOut: "Alejar",
              pan: "Paneo",
              reset: "Resetear Zoom",
            },
          },
        },
      ],
      type: "area",
      height: "100%",
      width: "100%",
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.3,
      },
      toolbar: {
        theme: "light",
      },
    },
    series: [
      {
        name: "Entregadas",
        data: dataInicial.d_e,
      },
      {
        name: "Dosis Parcial",
        data: dataInicial.d_p,
      },
      {
        name: "Dosis Total",
        data: dataInicial.d_t,
      },
    ],
    colors: [$storeDarkMode ? "#ced7e3" : "#374151", "#2563EB", "#D97706"],
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        dateTimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
        },
      },
      min: dataInicial.min,
      max: dataInicial.max,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function (n: number) {
          return generate(n, true);
        },
        style: {
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        formatter: function (value) {
          return day(value).locale("es").format("DD MMM, YYYY");
        },
      },
      y: {
        formatter: function (value) {
          return long(value);
        },
      },
      theme: "light",
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          yaxis: {
            show: false,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
    ],
  };

  $: {
    options.chart.foreColor = $storeDarkMode ? "#fafafa" : "#474747";
    options.tooltip.theme = $storeDarkMode ? "dark" : "light";
    options.chart.toolbar.theme = $storeDarkMode ? "dark" : "light";

    let colors = options.colors.length;
    if (colors === 3) {
      options.colors[0] = $storeDarkMode ? "#ced7e3" : "#374151";
    }
  }

  export const updateData = (opt: IOptChart) => {
    let capa = [];
    let colors = [];

    if (opt.d_e.length > 0) {
      capa = [
        ...capa,
        {
          name: "Dosis Entregadas",
          data: opt.d_e,
        },
      ];

      colors = [...colors, $storeDarkMode ? "#ced7e3" : "#374151"];
    }

    if (opt.d_p.length > 0) {
      capa = [
        ...capa,
        {
          name: "Dosis Parcial",
          data: opt.d_p,
        },
      ];

      colors = [...colors, "#2563EB"];
    }

    if (opt.d_t.length > 0) {
      capa = [
        ...capa,
        {
          name: "Dosis Total",
          data: opt.d_t,
        },
      ];

      colors = [...colors, "#D97706"];
    }

    options.series = capa;

    options.colors = colors;
    options.xaxis.min = opt.min;
    options.xaxis.max = opt.max;
  };

  $: {
    try {
      if (type != $storeTypeChart) {
        type = $storeTypeChart;
        let f = dep == "TOTAL" ? true : false;
        updateData(convertDataChart(f));
      } else if (dep != $storeDepChart) {
        dep = $storeDepChart;
        let f = dep == "TOTAL" ? true : false;
        updateData(generateDataChart(f));
      }
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div use:chart={options} class={cls} />
