export interface AlprStatistic {
  processing_time: number,
  results: [
    {
      box: {
        xmin: number,
        ymin: number,
        xmax: number,
        ymax: number
      },
      plate: string,
      region: {
        code: string,
        score: number
      },
      vehicle: {
        score: number,
        type: string,
        box: {
          xmin: number,
          ymin: number,
          xmax: number,
          ymax: number
        }
      },
      score: number,
      candidates: [
        {
          score: number,
          plate: string
        }
      ],
      dscore: number,
      // Make Model, Orientation and Color are only available if you set mmc=true
      model_make: [
        {
          make: string,
          model: string,
          score: number
        }
      ],
      color: [
        {
          color: string,
          score: number
        }
      ],
      orientation: [
        {
          orientation: string,
          score: number
        }
      ]
    }
  ],
  filename: string,
  version: number,
  camera_id: any,
  timestamp: string
}