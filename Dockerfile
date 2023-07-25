FROM amazon/aws-glue-libs:glue_libs_4.0.0_image_01

COPY book-store-api/avro/schema.avsc .

COPY ./TransformData.ipynb ./jupyter