import {
    Formik,
    Form,
    Field,
  } from 'formik'
import { PortraitData } from '@/app/portraits/components/PortraitCustomizer';
import SearchIcon from '@mui/icons-material/Search';
 
interface MyFormValues {
    searchTerm: string,
    searchBy: string
}

export default function SearchPortraits({ setFilteredPortraits, allPortraits }: { setFilteredPortraits: Function, allPortraits: Array<PortraitData> }) {

    const initialValues: MyFormValues = { searchTerm: '', searchBy: 'artistId' }

    return (
        <div className="w-1/2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const searchType = values.searchBy               
                    const filtered = allPortraits.filter(portrait => {
                        switch(searchType) {
                            case 'artistId':
                                if (portrait.artist.some(artist => artist.id === values.searchTerm)) return portrait
                                break
                            case 'artistName':
                                if (portrait.artist.some(artist => artist.artistName.toLowerCase().includes(values.searchTerm.toLowerCase()))) return portrait
                                break
                            case 'customerId':
                              if (portrait.customerId === values.searchTerm) return portrait
                              break
                            case 'portraitId':
                                if (portrait.id === values.searchTerm) return portrait
                                break
                            case 'title':
                                if (portrait.portraitTitle.toLowerCase().includes(values.searchTerm.toLowerCase())) return portrait
                                break
                            default:
                                break
                          }
                    })
                    setFilteredPortraits(filtered)

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
                                <Field type="radio" name="searchBy" value="artistId" className="mr-2"/>
                                <label>Artist Id</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="artistName" className="mr-2"/>
                                <label>Artist Name</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="customerId" className="mr-2"/>
                                <label> Customer Id</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="portraitId" className="mr-2"/>
                                <label>Portrait Id</label>
                            </div>

                            <div>
                                <Field type="radio" name="searchBy" value="title" className="mr-2"/>
                                <label>Portrait Title</label>
                            </div>
                            
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}