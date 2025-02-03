import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Slider from '../Components/Slider';
import Statistic from "../Components/Statestic";
import Sliders from "../Components/Sliders";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    navigate('/availability'); // Replace '/availability' with the correct route for your availability page
  };

  return (
    <div>
      <Navbar />
      <div className="drive">
        <button onClick={handleEmergencyClick} className="links">
          Click For Emergency blood requirement
        </button>
      </div>
      <Slider />
      <Statistic />
      <Sliders />
      <div style={{ paddingBottom: '50px' }}>
        <h1 className="save">How can Blood Bank Deal?</h1>
        <p className="save">
        Blood banks operate within a regulated framework to ensure the ethical collection, storage, and distribution of blood. Here's how they handle operations and deal with donors, hospitals, and patients:
        </p>
        <h1 className="save">
        Blood Collection
        </h1>
        <p className="save">Blood banks operate within a regulated framework to ensure the ethical collection, storage, and distribution of blood. Here's how they handle operations and deal with donors, hospitals, and patients:</p>
        <ul style={{padding:'20px',marginLeft:'50px'}}>
          <li>Voluntary Donations: Most blood banks rely on voluntary donors. They organize blood donation drives and campaigns.</li>
          <li>Replacement Donations: In some cases, family or friends of a patient may donate blood as a replacement for the units used.</li>
          <li>Screening: Donors are screened for eligibility based on health criteria to ensure safe donations.</li>
        </ul>
        <h1 className="save">Testing and Processing</h1>
        <p className="save">
        Blood collected from donors is tested for infections like HIV, hepatitis, malaria, and syphilis.<br />
        The blood is separated into components:
        <ul>
          <li>Red Blood Cells (RBCs)</li>
          <li>Plasma</li>
          <li>Platelets</li>
          <li>Cryoprecipitate</li>
        </ul>
        <br />
        Each component is stored under specific conditions for distribution.
        </p>
        <h1 className="save">Storage</h1>
        <p className="save">Blood banks store blood using strict temperature controls to maintain its quality and viability.
          <ul>
            <li>
              <b>RBCs:</b> 2°C to 6°C (lasts up to 42 days)
            </li>
            <li>
              <b>Plasma:</b> Frozen at -18°C or lower (lasts up to a year)
            </li>
            <li>
              <b>Platelets:</b> Room temperature with agitation (lasts up to 5 days).
            </li>
          </ul>
        </p>
        <h1 className="save">Distribution</h1>
        <p className="save">To Hospitals and Clinics: Blood banks supply blood components to hospitals based on their requests and patient needs.
<br /><br />
Emergency Situations: They prioritize critical cases like accidents, surgeries, or severe anemia.
<br /><br />
Exchange Agreements: Some blood banks exchange units with others to meet demand.</p>
<h1 className="save">Cost Recovery</h1>
<p className="save">
Processing Fees: Blood banks do not sell blood but may charge a nominal fee to recover the costs of:
<ul>
  <li>Screening for diseases.</li>
  <li>Storing and preserving the blood</li>
  <li>Administrative overheads</li>
</ul>
Government Schemes: Many countries have subsidized programs to make blood available for free or at minimal cost to patients in need.
</p>
<h1 className="save">
Dealing with demand
</h1>
<p className="save">
Inventory Management: Blood banks maintain a database to track available stock and avoid shortages.
<br /><br />
Technology Integration: Apps and websites are used to connect donors, blood banks, and patients efficiently.
<br /><br />
Emergency Drives: During shortages, banks organize immediate donation drives.
</p>
<h1 className="save">
Legal and Ethical Compliance
</h1>
<p className="save">
Blood banks adhere to laws like:
<ul>
  <li>
The Drugs and Cosmetics Act, 1940 (India).</li>
<li>National Blood Policy Guidelines.</li>
</ul>
They avoid unethical practices, like selling blood, which is strictly illegal.
</p>
<h1 className="save">Blood can sell out?</h1>
<p className="save" >No, the sale of blood is illegal in most countries, including India. Blood donation and distribution are governed by strict regulations to ensure it is a voluntary, ethical, and nonprofit activity. In India, the Drugs and Cosmetics Act, 1940 and its rules strictly prohibit the sale of blood, treating it as a life-saving resource and not a commodity.
<br />
Key Points:
<ul><li><b>Blood Banks:</b> Blood is collected, tested, and stored by government-authorized blood banks, which operate on a nonprofit basis.</li>

<li><b>Voluntary Donation:</b> Blood is typically donated voluntarily, and donors are not compensated financially.</li>

<li><b>Service Charge:</b> While blood cannot be sold, blood banks are allowed to recover a nominal processing fee to cover testing, storage, and administrative costs.</li>

<li><b>Illegal Trade:</b> Any attempt to sell or buy blood is a violation of the law and can result in severe penalties, including fines and imprisonment.</li>
</ul>
</p>

<h1 className="save">Why Selling Blood is Prohibited:</h1>
<p className="save">
  <ul>
    <li>
Ethical Concerns: Selling blood commodifies a vital resource and can exploit economically disadvantaged individuals.</li>
<li>Health Risks: A profit-driven system could lead to unsafe practices, like improper testing and storage.</li>
<li>Equity: A nonprofit model ensures blood is available to all patients regardless of financial status.</li>
</ul>
If you encounter cases of blood being sold, it should be reported to the local health authorities or law enforcement agencies.
</p>
<h1 className="save">Urgent requirement for more</h1>
<p className="save">As of September 2020, 63 districts in India lacked a single blood bank. These districts are distributed across several states:
<ul>
  <li>Arunachal Pradesh: 14 districts</li>
  <li>Assam: 5 districts</li>
  <li>Bihar: 5 districts</li>
  <li>Manipur: 12 districts</li>
  <li>Meghalaya: 7 districts</li>
  <li>Nagaland: 9 districts</li>
  </ul>

The specific districts without blood banks include:
<li>Arunachal Pradesh: Kamle, Pakke Kesang, Shi Yomi, Lepa Rada, Lohit, East Kameng, Kra Daadi, Siang, Lower Siang, Namsai, Dibang Valley, Anjaw, Tirap, Longding</li>
<li>Assam: South Salmara-Mankachar, Charaideo, Hojai, West Karbi Anglong</li>
<li>Bihar: Arwal, Araria, Supaul, Banka, Sheohar</li>
<li>Gujarat: Mahisagar, Dang</li>
<li>Haryana: Charkhi Dadri</li>
<li>Himachal Pradesh: Lahaul and Spiti</li>
<li>Jammu & Kashmir: Bandipora, Ganderbal, Shopian, Reasi</li>
<li>Jharkhand: Khunti, Jamtara, Ramgarh</li>
<li>Madhya Pradesh: Agar Malwa, Niwari</li>
<li>Manipur: Senapati, Ukhrul, Chandel, Tamenglong, Bishnupur, Jiribam, Kangpokpi, Kakching, Tengnoupal, Kamjong, Noney, Pherzawl</li>
<li>Meghalaya: South West Khasi Hills, East Jaintia Hills, East Garo Hills, South West Garo Hills, North Garo Hills, South Garo Hills</li>
<li>Nagaland: Peren, Kiphire, Longleng, Mon, Wokha, Phek, Tuensang, Zunheboto, Noklak</li>
<li>Sikkim: North Sikkim, West Sikkim</li>
<li>Telangana: Warangal Rural, Mahabubabad, Asifabad, Nagarkurnool</li>

Please note that this information is based on data available up to September 2020, and the current status may have changed since then.</p>
      </div>
    </div>
  );
};

export default HeroSection;
