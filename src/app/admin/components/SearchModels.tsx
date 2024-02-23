import {
    Formik,
    Form,
    Field,
  } from 'formik'
import SearchIcon from '@mui/icons-material/Search';
import { ModelData } from './ModelList';
 
interface MyFormValues {
    searchTerm: string,
    searchBy: string
}

export default function SearchModels({ setFilteredModels, allModels }: { setFilteredModels: Function, allModels: Array<ModelData> }) {

    const initialValues: MyFormValues = { searchTerm: '', searchBy: 'portraitId' }

    return (
        <div className="w-1/2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const searchType = values.searchBy               
                    const filtered = allModels.filter(model => {
                        switch(searchType) {
                            case 'portraitId':
                                if (model.portraitId.toLowerCase().includes(values.searchTerm.toLowerCase())) return model
                                break
                            case 'customerId':
                                if (model.customerId.toLowerCase().includes(values.searchTerm.toLowerCase())) return model
                              break
                            case 'customerName':
                                if (model.customerName.toLowerCase().includes(values.searchTerm.toLowerCase())) return model
                                break
                            case 'modelId':
                                if (model.uid.toLowerCase().includes(values.searchTerm.toLowerCase())) return model
                                break
                            default:
                                break
                        }
                    })
                    setFilteredModels(filtered)

                    actions.setSubmitting(false);
                    values.searchTerm = ''
                }}
            >
                <Form>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <Field 
                                id="searchTerm" 
                                name="searchTerm" 
                                placeholder="searchTerm" 
                                className='w-full px-4 py-2 mr-4 border border-[#e9e9e9] rounded-lg' 
                            />
                            
                            <button type="submit" className='p-2 border border-[#e9e9e9] rounded-lg hover:bg-[#43b4e4] text-gray-500 hover:text-white'>
                                <SearchIcon className="h-[24px] w-[24px] " />
                            </button>
                        </div>
                        <div className='w-full mt-2 flex justify-between'>
                                
                            <div>
                                <Field type="radio" name="searchBy" value="portraitId" className="mr-2"/>
                                <label>Portrait Id</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="customerId" className="mr-2"/>
                                <label> Customer Id</label>
                            </div>

                            <div>
                                <Field type="radio" name="searchBy" value="customerName" className="mr-2"/>
                                <label>Customer Name</label>
                            </div>

                            <div>
                                <Field type="radio" name="searchBy" value="modelId" className="mr-2"/>
                                <label>3D Model Id</label>
                            </div>
                            
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}