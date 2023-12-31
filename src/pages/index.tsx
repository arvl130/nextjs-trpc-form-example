import { api } from "@/utils/api"
import {
  ReceptionMode,
  ShippingMode,
  ShippingType,
  supportedReceptionModes,
  supportedShippingModes,
  supportedShippingTypes,
} from "@/utils/constants"
import { countryCodeToName, supportedCountryCodes } from "@/utils/country-code"
import { Inter } from "next/font/google"
import { useRef } from "react"
import toast from "react-hot-toast"
const inter = Inter({ subsets: ["latin"] })

export function DeleteButton({ packageId }: { packageId: number }) {
  const { refetch } = api.package.getAll.useQuery()
  const { isLoading, mutate } = api.package.deleteById.useMutation({
    onSuccess: () => {
      toast.success("Delete successful!")
      refetch()
    },
  })

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={() =>
          mutate({
            id: packageId,
          })
        }
        className="text-sm bg-red-500 hover:bg-red-400 disabled:bg-red-300 transition-colors px-4 py-2 rounded-md font-medium text-white"
      >
        Delete
      </button>
    </>
  )
}

export default function Home() {
  const formRef = useRef<null | HTMLFormElement>(null)
  const { status, data: packages, refetch } = api.package.getAll.useQuery()
  const { isLoading, mutate } = api.package.create.useMutation({
    onSuccess: () => {
      toast.success("Submit successful!")
      refetch()
      formRef.current?.reset()
    },
  })

  return (
    <main className={`${inter.className} min-h-screen bg-gray-100 pt-12 pb-6`}>
      <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
        <form
          ref={formRef}
          className="bg-white px-12 py-6 rounded-2xl"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            mutate({
              shippingMode: formData.get("shippingMode") as ShippingMode,
              shippingType: formData.get("shippingType") as ShippingType,
              receptionMode: formData.get("receptionMode") as ReceptionMode,
              weightInKg: parseInt(formData.get("weightInKg") as string),
              senderFullName: formData.get("senderFullName") as string,
              senderContactNumber: formData.get(
                "senderContactNumber"
              ) as string,
              senderEmailAddress: formData.get("senderEmailAddress") as string,
              senderStreetAddress: formData.get(
                "senderStreetAddress"
              ) as string,
              senderCity: formData.get("senderCity") as string,
              senderStateOrProvince: formData.get(
                "senderStateOrProvince"
              ) as string,
              senderCountryCode: formData.get("senderCountryCode") as string,
              senderPostalCode: parseInt(
                formData.get("senderPostalCode") as string
              ),
              receiverFullName: formData.get("receiverFullName") as string,
              receiverContactNumber: formData.get(
                "receiverContactNumber"
              ) as string,
              receiverEmailAddress: formData.get(
                "receiverEmailAddress"
              ) as string,
              receiverStreetAddress: formData.get(
                "receiverStreetAddress"
              ) as string,
              receiverBarangay: formData.get("receiverBarangay") as string,
              receiverCity: formData.get("receiverCity") as string,
              receiverStateOrProvince: formData.get(
                "receiverStateOrProvince"
              ) as string,
              receiverCountryCode: formData.get(
                "receiverCountryCode"
              ) as string,
              receiverPostalCode: parseInt(
                formData.get("receiverPostalCode") as string
              ),
            })
          }}
        >
          <div className="grid grid-cols-2 gap-x-4 mb-4">
            <div className="mb-2">
              <label className="block mb-1">Shipping Mode</label>
              <select
                name="shippingMode"
                className="block w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
              >
                {supportedShippingModes.map((shippingMode) => (
                  <option key={shippingMode} value={shippingMode}>
                    {shippingMode}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Shipping Type</label>
              <select
                name="shippingType"
                className="block w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
              >
                {supportedShippingTypes.map((shippingType) => (
                  <option key={shippingType} value={shippingType}>
                    {shippingType}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Reception Mode</label>
              <select
                name="receptionMode"
                className="block w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
              >
                {supportedReceptionModes.map((receptionMode) => (
                  <option key={receptionMode} value={receptionMode}>
                    {receptionMode}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">Weight in KG</label>
              <input
                required
                name="weightInKg"
                type="number"
                placeholder="50"
                className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Sender</p>
              <div className="mb-2">
                <label className="block mb-1">Full Name</label>
                <input
                  required
                  name="senderFullName"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Contact Number</label>
                <input
                  required
                  name="senderContactNumber"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Email Address</label>
                <input
                  required
                  name="senderEmailAddress"
                  type="email"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Street Address</label>
                <input
                  required
                  name="senderStreetAddress"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">City</label>
                <input
                  required
                  name="senderCity"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">State/Province</label>
                <input
                  required
                  name="senderStateOrProvince"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Country Code</label>
                <select
                  name="senderCountryCode"
                  className="block w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                >
                  {supportedCountryCodes.map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {countryCodeToName(countryCode)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Postal Code</label>
                <input
                  required
                  name="senderPostalCode"
                  type="number"
                  placeholder="1111"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Receiver</p>
              <div className="mb-2">
                <label className="block mb-1">Full Name</label>
                <input
                  required
                  name="receiverFullName"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Contact Number</label>
                <input
                  required
                  name="receiverContactNumber"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Email Address</label>
                <input
                  required
                  name="receiverEmailAddress"
                  type="email"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Street Address</label>
                <input
                  required
                  name="receiverStreetAddress"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Barangay</label>
                <input
                  required
                  name="receiverBarangay"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">City</label>
                <input
                  required
                  name="receiverCity"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">State/Province</label>
                <input
                  required
                  name="receiverStateOrProvince"
                  type="text"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Country Code</label>
                <select
                  name="receiverCountryCode"
                  className="block w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                >
                  {supportedCountryCodes.map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {countryCodeToName(countryCode)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Postal Code</label>
                <input
                  required
                  name="receiverPostalCode"
                  type="number"
                  placeholder="1111"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 focus:ring-blue-300/40"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 transition-colors px-4 py-2 rounded-md font-medium text-white"
            >
              {isLoading ? "Saving ..." : "Save"}
            </button>
          </div>
        </form>
        <div className="bg-white px-6 py-6 rounded-2xl">
          {status === "success" && (
            <>
              {packages.length === 0 ? (
                <p className="text-center">No packages found.</p>
              ) : (
                <table className="border border-black">
                  <tr className="border border-black">
                    <th className="border border-black px-2 py-1">ID</th>
                    <th className="border border-black px-2 py-1">
                      Shipping Mode
                    </th>
                    <th className="border border-black px-2 py-1">
                      Shipping Type
                    </th>
                    <th className="border border-black px-2 py-1">
                      Reception Mode
                    </th>
                    <th className="border border-black px-2 py-1">
                      Weight (KG)
                    </th>
                    <th className="border border-black px-2 py-1">Actions</th>
                  </tr>
                  {packages.map((_package) => (
                    <tr key={_package.id} className="border border-black">
                      <td className="border border-black px-2 py-1 text-center">
                        {_package.id}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {_package.shippingMode}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {_package.shippingType}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {_package.receptionMode}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        {_package.weightInKg}
                      </td>
                      <td className="border border-black px-2 py-1 text-center">
                        <DeleteButton packageId={_package.id} />
                      </td>
                    </tr>
                  ))}
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
