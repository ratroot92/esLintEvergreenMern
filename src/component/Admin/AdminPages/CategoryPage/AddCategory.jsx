import React from 'react';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers';

import * as yup from 'yup';

import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import CategoryService from '../../../../services/CategoryServce';



// import ReactLoading from 'react-loading';
import ReusableModal from '../../../ReusableComponents/ReusableModal';

import AllCategories from './AllCategories';



/* Validation starts here */
const schema = yup.object().shape({
  catName: yup.string().required(function () {
    NotificationManager.error('Category Name  is Required');
  }),
  catDescription: yup.string().required(function () {
    NotificationManager.error('Category Description is  Required');
  }),
});

/* Validation ends here */
/* Functional componennet starts here */

const Register = () => {
  const [modalToggler, setModalToggler] = React.useState(false);
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  

  const onSubmit = async (formData) => {
    // setLoader(false);
    const categoryExist = await CategoryService.categoryAlreadyExist(
      formData.catName
    );
    if (categoryExist.payload) {
      NotificationManager.error(categoryExist.msgBody);
      setModalToggler(true);
    } else {
      CategoryService.createCategory(formData)
        .then((res) => {
          if (res.success) {
            NotificationManager.success(res.msgBody);
            reset();
            setModalToggler(false);
            // setLoader(true);
          } else {
            NotificationManager.error(res.msgBody);
            setModalToggler(false);
            // setLoader(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setModalToggler(false);
          // setLoader(true);
        });
    }
  };

  const AddCategoryForm = () => {
    return (
      <div className="">
        <div className="d-flex flex-row justify-content-center align-items-center mt-2">
          <label htmlFor="catName" className="mr-2">
             Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm custom-input-register"
            name="catName"
            id="catName"
            ref={register}
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center mt-2">
          <label htmlFor="catDescription" className="mr-2">
             Description
          </label>
          <textarea
            className="form-control form-control-sm custom-input-register"
            name="catDescription"
            id="catDescription"
            type="text"
            ref={register}
            required
          ></textarea>
        </div>

        <div className="d-flex flex-row justify-content-center align-items-center mt-2">
          <label htmlFor="catImage" className="mr-2">
             Image
          </label>
          <input
            className="form-control form-control-sm custom-input-register"
            name="catImage"
            id="catImage"
            type="file"
            // multiple={false}
            ref={register}
            required
          />
        </div>
      </div>
    );
  };

  return (
    <>
    
        <div className="container-fluid h-100 ">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <button
                    type="button"
                    className="btn btn-success btn-sm pull-right"
                    onClick={() => {
                      setModalToggler(!modalToggler);
                    }}
                  >
                    Add Category
                  </button>
                </div>
                <div className="card-body">
                  <AllCategories />
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <ReusableModal
              modalTitle="Category"
              ModalContent={<AddCategoryForm />}
              ModalToggler={modalToggler}
              setModalToggler={setModalToggler}
            />
          </form>
        </div>
     
      <NotificationContainer />
    </>
  );
};
export default Register;
