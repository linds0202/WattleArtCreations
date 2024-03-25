import {
    Formik,
    Form,
    Field,
  } from 'formik'
import SearchIcon from '@mui/icons-material/Search';
import { PaymentType } from './ArtistPayments';
 
interface MyFormValues {
    searchTerm: string,
    searchBy: string
}

export default function SearchPayments({ setFilteredPayments, allPayments }: { setFilteredPayments: Function, allPayments: Array<PaymentType> }) {

    const initialValues: MyFormValues = { searchTerm: '', searchBy: 'paymentId' }

    return (
        <div className="w-1/2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const searchType = values.searchBy               
                    const filtered = allPayments.filter(payment => {
                        switch(searchType) {
                            case 'paymentId':
                                if (payment.uid.toLowerCase().includes(values.searchTerm.toLowerCase())) return payment
                                break
                            case 'artistId':
                                if (payment.artistId.toLowerCase().includes(values.searchTerm.toLowerCase())) return payment
                                break
                            case 'portraitId':
                                if (payment.portraitId.toLowerCase().includes(values.searchTerm.toLowerCase())) return payment
                                break
                            default:
                                break
                          }
                    })
                    setFilteredPayments(filtered)

                    actions.setSubmitting(false)
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
                        <div className='w-2/3 mt-2 flex justify-between'>
                            <div>
                                <Field type="radio" name="searchBy" value="paymentId" className="mr-2"/>
                                <label>Payment Id</label>
                            </div>

                            <div>
                                <Field type="radio" name="searchBy" value="artistId" className="mr-2"/>
                                <label>Artist Id</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="portraitId" className="mr-2"/>
                                <label>Portrait Id</label>
                            </div>
                            
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}