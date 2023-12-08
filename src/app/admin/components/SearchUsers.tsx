import {
    Formik,
    Form,
    Field,
  } from 'formik'
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import SearchIcon from '@mui/icons-material/Search';
 
interface MyFormValues {
    searchTerm: string,
    searchBy: string
}

export default function SearchUsers({ setFilteredUsers, allUsers }: { setFilteredUsers: Function, allUsers: Array<UserData> }) {

    const initialValues: MyFormValues = { searchTerm: '', searchBy: 'id' }

    return (
        <div className="w-1/2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const searchType = values.searchBy               
                    const filtered = allUsers.filter(user => {
                        switch(searchType) {
                            case 'id':
                                if (user.uid === values.searchTerm) return user
                                break
                            case 'artistName':
                                if (user.artistName.toLowerCase().includes(values.searchTerm.toLowerCase())) return user
                                break
                            case 'displayName':
                                if (user.displayName?.toLowerCase().includes(values.searchTerm.toLowerCase())) return user
                                break
                            case 'email':
                                if (user.email.toLowerCase().includes(values.searchTerm.toLowerCase())) return user
                                break
                            // case 'title':
                            //     if (user.portraitTitle.toLowerCase().includes(values.searchTerm.toLowerCase())) return portrait
                            //     break
                            default:
                                break
                          }
                    })
                    setFilteredUsers(filtered)

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
                                <Field type="radio" name="searchBy" value="id" className="mr-2"/>
                                <label>Id</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="artistName" className="mr-2"/>
                                <label>Artist Name</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="displayName" className="mr-2"/>
                                <label> Display Name</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="email" className="mr-2"/>
                                <label>Email</label>
                            </div>

                            {/* <div>
                                <Field type="radio" name="searchBy" value="title" className="mr-2"/>
                                <label>Portrait Title</label>
                            </div> */}
                            
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}