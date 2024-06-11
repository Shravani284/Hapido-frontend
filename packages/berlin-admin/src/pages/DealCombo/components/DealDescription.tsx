import { Box, Button } from '@mui/material';
import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';
import { FieldArray } from 'formik';
import CodeEditor from '../../../components/codeEditor';

const DealDescription = ({ formik, permission }: any) => {
  const enTitle = formik.values.deal_descriptions[0]?.translations.findIndex(
    (e: any) =>
      e.column_name === 'description_title_trans_ids' && e.locale === 'en'
  );
  const arTitle = formik.values.deal_descriptions[0]?.translations.findIndex(
    (e: any) =>
      e.column_name === 'description_title_trans_ids' && e.locale === 'ar'
  );
  const enDetail = formik.values.deal_descriptions[0]?.translations.findIndex(
    (e: any) =>
      e.column_name === 'description_detail_trans_ids' && e.locale === 'en'
  );
  const arDetail = formik.values.deal_descriptions[0]?.translations.findIndex(
    (e: any) =>
      e.column_name === 'description_detail_trans_ids' && e.locale === 'ar'
  );

  const obj = [
    {
      locale: 'en',
      column_name: 'description_title_trans_ids',
      text: '',
    },
    {
      locale: 'en',
      column_name: 'description_detail_trans_ids',
      text: '',
    },
    {
      locale: 'ar',
      column_name: 'description_title_trans_ids',
      text: '',
    },
    {
      locale: 'ar',
      column_name: 'description_detail_trans_ids',
      text: '',
    },
  ];
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={12}>
          <FieldArray
            name="deal_descriptions"
            render={(arrayHelpers) => (
              <div>
                {formik.values.deal_descriptions?.map(
                  (name: string, index: number) => (
                    <div key={index}>
                      <Grid container spacing={3.5}>
                        <Grid item xs={6} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Description Title (English)
                              <span className="asterisk">*</span>
                            </InputLabel>
                            <NormalTextField
                              sx={{ mb: 2 }}
                              name={`deal_descriptions[${index}].translations[${enTitle}].text`}
                              placeholder="Enter Description Title (English)"
                              multiline={true}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Description Title (Arabic)
                              <span className="asterisk">*</span>
                            </InputLabel>
                            <NormalTextField
                              name={`deal_descriptions[${index}].translations[${arTitle}].text`}
                              placeholder="Enter Description Title (Arabic)"
                              multiline={true}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Description Detail (English)
                              <span className="asterisk">*</span>
                            </InputLabel>

                            <CodeEditor
                              value={
                                formik?.values?.deal_descriptions[index]
                                  ?.translations[enDetail]?.text
                              }
                              formik={formik}
                              error={
                                formik?.errors?.deal_descriptions &&
                                formik?.errors?.deal_descriptions[index]
                                  ?.translations[enDetail]?.text
                              }
                              touched={
                                formik?.touched?.deal_descriptions &&
                                formik?.touched?.deal_descriptions[index]
                                  ?.translations[enDetail]?.text
                              }
                              name={`deal_descriptions[${index}].translations[${enDetail}].text`}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Description Detail (Arabic)
                              <span className="asterisk">*</span>
                            </InputLabel>
                            <CodeEditor
                              lang={'ar'}
                              value={
                                formik?.values?.deal_descriptions[index]
                                  ?.translations[arDetail]?.text
                              }
                              formik={formik}
                              error={
                                formik?.errors?.deal_descriptions &&
                                formik?.errors?.deal_descriptions[index]
                                  ?.translations[arDetail]?.text
                              }
                              touched={
                                formik?.touched?.deal_descriptions &&
                                formik?.touched?.deal_descriptions[index]
                                  ?.translations[arDetail]?.text
                              }
                              name={`deal_descriptions[${index}].translations[${arDetail}].text`}
                            />
                          </Stack>
                        </Grid>
                      </Grid>

                      <Box mt={2} mb={2}>
                        {formik.values.deal_descriptions.length === 1 ? (
                          ''
                        ) : (
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                            disabled={
                              permission === 'WRITE' || permission === 'FULL'
                                ? false
                                : true
                            }
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            REMOVE
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          color="secondary"
                          sx={{ mr: 1 }}
                          disabled={
                            permission === 'WRITE' || permission === 'FULL'
                              ? false
                              : true
                          }
                          onClick={() =>
                            arrayHelpers.push({ translations: obj })
                          } // insert an empty string at a position
                        >
                          ADD
                        </Button>
                      </Box>
                    </div>
                  )
                )}
              </div>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DealDescription;
