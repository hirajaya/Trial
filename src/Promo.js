import { useEffect, useState } from "react"

export default function Promo(){

    const [promoname, setPromoname] = useState("");
    const [promodate, setPromoDate] = useState("");
    const [promotype, setPromoType] = useState("");
    const [promoimage, setPromoImage] = useState("");
    const [promodescription, setPromodescription] = useState("");
    const [promos, setPromos] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [editid, setEditID] = useState(-1);

    //edit
    const [editpromoname, setEditPromoname] = useState("");
    const [editpromodate, setEditPromoDate] = useState("");
    const [editpromotype, setEditPromoType] = useState("");
    const [editpromoimage, setEditPromoImage] = useState("");
    const [editpromodescription, setEditPromodescription] = useState("");

    const apiUrl = "http://localhost:3001"

    const handleSubmit = () => {
        setError("")
        //check inputs
        if(promoname.trim() !== '' && promodate.trim() !== '' && promotype.trim() !== '' && promoimage.trim() !== '' && promodescription){
            fetch(apiUrl+"/promos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({promoname, promodate, promotype, promoimage, promodescription })
            }).then((res) =>{
                if (res.ok) {
                    //add promo to list
                    setPromos([ ...promos, {promoname, promodate, promotype, promoimage, promodescription}])
                    setPromoname("")
                    setPromoDate("")
                    setPromoType("")
                    setPromoImage("")
                    setPromodescription("")
                    setMessage("Promotion created")
                    setTimeout(() => {
                        setMessage("");
                    },3000)
                    
                }else {
                    //set error
                    setError("Unable to create promotion")
                }
            }).catch(() => {
                setError("Unable to create promotion")
            })
        }
    }

    useEffect(() => {
        getPromos()
    }, [])

    const getPromos = () => {
        fetch(apiUrl+"/promos")
        .then((res) => res.json())
        .then((res) => {
            setPromos(res)
        })
    }

    const handleEdit = (promo) => {
        setEditID(promo._id); 
        setEditPromoname(promo.promoname); 
        setEditPromoDate(promo.promodate); 
        setEditPromoType(promo.promotype); 
        setEditPromoImage(promo.promoimage); 
        setEditPromodescription(promo.promodescription)
    }

    const handleUpdate = () => {
        setError("");
      
        // Check inputs
        if (
          editpromoname.trim() !== '' && 
          editpromodate.trim() !== '' && 
          editpromotype.trim() !== '' && 
          editpromoimage.trim() !== '' && 
          editpromodescription.trim() !== ''
        ) {
          fetch(apiUrl + "/promos/" + editid, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              promoname: editpromoname,
              promodate: editpromodate,
              promotype: editpromotype,
              promoimage: editpromoimage,
              promodescription: editpromodescription
            })
          }).then((res) => {
            if (res.ok) {
              // Update promo in list
              const updatedPromos = promos.map((promo) => {
                if (promo._id === editid) {
                  return {
                    ...promo,
                    promoname: editpromoname,
                    promodate: editpromodate,
                    promotype: editpromotype,
                    promoimage: editpromoimage,
                    promodescription: editpromodescription
                  };
                }
                return promo;
              });
              setPromos(updatedPromos);
              setEditPromoname("")
              setEditPromoDate("")
              setEditPromoType("")
              setEditPromoImage("")
              setEditPromodescription("")
              setMessage("Promotion Updated");
              setTimeout(() => {
                setMessage("");
              }, 3000);
      
              setEditID(-1);
            } else {
              // Set error
              setError("Unable to update promotion");
            }
          }).catch(() => {
            setError("Unable to update promotion");
          });
        }
      };
      
    

    const handleEditCancel = () => {
        setEditID(-1)
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure to delete?')){
            fetch(apiUrl+'/promos/'+id, {
                method: "DELETE"
            })
            .then(() => {
                const updatedPromos = promos.filter((promo) => promo._id !== id)
                setPromos(updatedPromos)
            })

        }

    }



    return <>
    
    <div className="row p-0 bg-success bg-gradient text-light">
        <h4>Promotion Page</h4>
    </div>
    <div className="container">
    <div className="row p-2 text-start">
    <h2>Create Promotion</h2>
    {message && <p className="text-success">{message}</p>}
    
    <div className="form-group p-4 shadow-sm rounded border bg-light">
        
       <input placeholder="Promotion Name" onChange={(e) => setPromoname(e.target.value)} value={promoname} className="form-control mb-3" type="text"/>
       <input placeholder="Promotion Date" onChange={(e) => setPromoDate(e.target.value)} value={promodate} className="form-control mb-3" type="text"/>
       <input placeholder="Promotion Type" onChange={(e) => setPromoType(e.target.value)} value={promotype} className="form-control mb-3" type="text"/>
       <input placeholder="Promotion Image" onChange={(e) => setPromoImage(e.target.value)} value={promoimage} className="form-control mb-3" type="text"/>
       <input placeholder="Description" onChange={(e) => setPromodescription(e.target.value)} value={promodescription} className="form-control mb-3" type="text"/>

       <button className="btn btn-dark mt-3" onClick={handleSubmit}>
        Submit
       </button>
    </div>
    
    {error && <p className="text-danger mt-2">{error}</p>}
</div>

    <div className="row mt-3 text-start">
        <h3>All Promotions</h3>
        <div className="col-md">
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Promotion Name</th>
        <th>Date</th>
        <th>Type</th>
        <th>Image</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        promos.map((promo) => (
          <tr key={promo._id}>
            {editid == -1 || editid !== promo._id ? (
              <>
                <td className="fw-bold">{promo.promoname}</td>
                <td>{promo.promodate}</td>
                <td>{promo.promotype}</td>
                <td>{promo.promoimage}</td>
                <td>{promo.promodescription}</td>
              </>
            ) : (
              <>
                <td>
                  <input placeholder="Promotion Name" onChange={(e) => setEditPromoname(e.target.value)} value={editpromoname} className="form-control" type="text" />
                </td>
                <td>
                  <input placeholder="Promotion Date" onChange={(e) => setEditPromoDate(e.target.value)} value={editpromodate} className="form-control" type="text" />
                </td>
                <td>
                  <input placeholder="Promotion Type" onChange={(e) => setEditPromoType(e.target.value)} value={editpromotype} className="form-control" type="text" />
                </td>
                <td>
                  <input placeholder="Promotion Image" onChange={(e) => setEditPromoImage(e.target.value)} value={editpromoimage} className="form-control" type="text" />
                </td>
                <td>
                  <input placeholder="Description" onChange={(e) => setEditPromodescription(e.target.value)} value={editpromodescription} className="form-control" type="text" />
                </td>
              </>
            )}
            <td className="d-flex gap-2">
              {editid == -1 || editid !== promo._id ? (
                <>
                  <button className="btn btn-warning" onClick={() => handleEdit(promo)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(promo._id)}>Delete</button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
                  <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                </>
              )}
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
</div>


    </div>
    </div>
    </>
}