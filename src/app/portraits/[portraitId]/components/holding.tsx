<Accordion title="Submit an Image" required={false} active={false} >
                
                {/* Edit or See Questions */}
                <div className='w-full border-2 border-blue-600 p-4'>
                    {!portrait?.revised
                        ? <div>
                            {portrait?.artistSubmitted.length > 0 
                            ? <div>
                                <h3 className='text-xl font-bold text-center'>Submit an Revision</h3>
                                {portrait?.additionalRevision 
                                    ? <p>See 'Additional Revisions' section below</p>
                                    : <div>
                                        <p>Upload your revision</p>
                                        <p>This will be submission {portrait?.artistSubmitted.length + 1} of 3 included in original commission</p>
                                    </div>
                                }
                            </div>
                            : <div>
                                <h3 className='text-xl font-bold text-center'>Submit an Image</h3>
                                <p>Upload your first submission by clicking 'Upload Image' in the final image section of this page.</p>
                            </div>}
                        </div>
                        : <p>Waiting on customer Review</p>
                    }
                    {portrait?.revisionNotes.length !== 0 &&
                        <div>
                            <p className="pt-4">Customer Revision Notes: </p>
                            <div className="border-2 border-red-600 rounded-lg">
                                {revisions}
                            </div>
                        </div>
                    }
                    
                </div>

            </Accordion>