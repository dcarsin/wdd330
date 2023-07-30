import { Service } from "typedi";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage } from "class-transformer/cjs/storage";

@Service()
export class SwaggerService {
  public buildSwaggerUi(basePath: String, options: any): String {
    const swaggerSpec = this.buildSwaggerJSON(options);

    return this.getSaggerUi(swaggerSpec, basePath);
  }

  public buildSwaggerJSON(options: any) {
    const storage = getMetadataArgsStorage();
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
      classTransformerMetadataStorage: defaultMetadataStorage,
    });
    const swaggerSpec = routingControllersToSpec(
      storage,
      { routePrefix: "/api", cors: true, defaultErrorHandler: false },
      {
        ...options,
        components: {
          schemas,
          securitySchemes: {
            jwt: {
              type: "http",
              scheme: "bearer",
              in: "header",
              bearerFormat: "JWT",
            },
          },
          security: [
            {
              jwt: [],
            },
          ],
        },
      }
    );

    return swaggerSpec;
  }

  private getSaggerUi(swaggerSpec, path) {
    return `<!DOCTYPE html><html lang=en> <head> <link rel="shortcut icon" href="./${path}/favicon-32x32.png" type=image/x-icon> <meta charset="utf-8"/> <meta name=viewport content="width=device-width, initial-scale=1"/> <meta name=description content="SwaggerIU"/> <title>SwaggerUI</title> <link rel=stylesheet href="./${path}/swagger-ui.css"/> </head> <body> <div id=swagger-ui></div><script src=./${path}/swagger-ui-bundle.js crossorigin></script> <script>window.onload=()=>{const spec=${JSON.stringify(
      swaggerSpec
    )};window.ui=SwaggerUIBundle({spec,dom_id:'#swagger-ui',presets:[SwaggerUIBundle.presets.apis,SwaggerUIBundle.SwaggerUIStandalonePreset],});};</script> </body></html>`;
  }
}
