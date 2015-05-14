{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "indicators": {
      "id": "indicators",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "goal": {
            "id": "goal",
            "type": "integer",
            "required": true
          },
          "indicator": {
            "id": "indicator",
            "type": "string",
            "required": true
          },
          "data": {
            "id": "data",
            "type": "object",
            "required": true,
            "properties": {
              "url": {
                "id": "url",
                "type": "string",
                "required": true
              },
              "format": {
                "id": "format",
                "type": "string",
                "required": true
              },
              "meta": {
                "id": "meta",
                "type": "string",
                "required": true
              }
            },
            "additionalProperties": false
          },
          "source": {
            "id": "source",
            "type": "string",
            "required": true
          },
          "leads": {
            "id": "leads",
            "type": "string",
            "required": true
          },
          "other goals": {
            "id": "other-goals",
            "type": "string",
            "required": true
          },
          "category": {
            "id": "category",
            "type": "string",
            "required": true
          }
        },
        "additionalProperties": false
      },
      "additionalItems": false
    }
  },
  "additionalProperties": false
}
